This is a detailed tutorial about how you can use Keploy to do integration as well as E2E testing to your go lang application, ( more abotu applicaiton), by end of this you will learn.

## Problem with traditional testing :
Traditionally, API testing is very manual and maintenance-heavy. You write unit tests, integration tests, and end-to-end tests by manually constructing requests and defining expected responses for each and every feature. Even though it is doable for small use cases like unit tests, or if the application has fewer dependencies, if the application has multiple dependencies like databases, queues, and third-party APIs, it exponentially becomes harder.

Integration testing is very painful because to reproduce the exact environment, you need to set up databases with the correct schema, configure environment variables, and prepare everything in the exact way it is supposed to work. The other way is to make mocks for each external dependency, but they simulate what developers _expect_ a dependency to do rather than necessarily reflecting what that dependency actually does in production.

## How Keploy solves this: 
Keploy solves pretty much all of this pain by taking an approach where you literally don't have to write any test cases, mocks, or expected responses. Instead, Keploy does it for you. It captures the application's real interactions and uses them to generate reproducible test cases and mocks. This lets your tests reflect how the application actually behaves, while reducing the effort of maintaining test data and external dependencies. But how does this actually work inside a Go application? Let’s build a simple example and walk through the process step by step.

## The Application We'll Be Testing

For this tutorial, we'll use a small Go-based URL shortener built with Echo. It takes a long URL, generates a short ID for it, and stores the mapping in PostgreSQL so the short URL can later redirect to the original one.

The application is simple, but it has a real external dependency: PostgreSQL. This makes it useful for understanding Keploy because we'll be able to see how Keploy captures not just the API interaction, but also the application's interaction with its database.

```txt
              HTTP Request
                   |
                   v
              +---------+
              | Go API  |
              |  Echo   |
              +---------+
                   |
              SQL Queries
                   |
                   v
            +-------------+
            | PostgreSQL  |
            +-------------+
```


```json
POST /url
{"url": "https://github.com"}
```


## Setup the application

setting up this is really simple, first 
clone the repo and go to echo-sql directory

```bash
git clone https://github.com/keploy/samples-go.git && cd samples-go/echo-sql
go mod download
```

change the line 47 of main.go to "localhost" instead of "postgresDb" 

### start postgres

```bash
docker compose up -d postgres
docker compose ps //wait until the container is healthy
```

**Note:** We initially tried running the Go application through Docker Compose with Keploy, but the Keploy agent failed to initialize its eBPF hooks with `neither debugfs nor tracefs are mounted`. The agent container could not access the required Linux tracing filesystem (`tracefs`), so it exited before the Go application started; running Keploy natively on the host worked because the host already had the required tracing interfaces available.

### Build and Run the go server

```bash
go build -o echo-psql-url-shortener .
./echo-psql-url-shortener
```
### Try the API

```bash
curl -sS --request POST \
  --url http://localhost:8082/url \
  --header 'Content-Type: application/json' \
  --data '{"url": "https://github.com"}'
```

you will get a json response with the shorten url, example response: 
```json
{"ts": 1789649631988852376,"url":"http://localhost:8082/4KepjkTT"}
```

now verify it : 

```bash
curl -sS -o /dev/null -w '%{http_code} %{redirect_url}\n' \
  --url "http://localhost:8082/<SHORT_ID>"
```


## Use Keploy 

now that you understand how the API works, now we will use keploy 

first thing we need to do is record with keploy
what is record, what are we recording ?

So what Keploy does is **observe the real interactions happening while your application handles an API request**. In record mode, it captures the incoming API request and the application's outgoing interactions with dependencies such as the PostgreSQL database, and uses those interactions to generate a reproducible test case and the corresponding mocks.

For our application, that means we don't need to manually write a test for `POST /url`, define what the response should look like, or create a mock PostgreSQL response. We simply run the application through Keploy, make the API calls we want to test, and **Keploy turns those real interactions into test data that it can replay later**. So let's start the application in record mode and make our first request.

```
sudo -E PATH=$PATH keploy record -c "./echo-psql-url-shortener"
```

Once Keploy starts, leave that terminal running and open another terminal to make the API request, that we preiously made to run the application, this is generating the testcases which the keploy will directly record.

```bash
curl -sS --request POST \
  --url http://localhost:8082/url \
  --header 'Content-Type: application/json' \
  --data '{"url": "https://github.com"}'
```

and
```bash
curl -sS -o /dev/null -w '%{http_code} %{redirect_url}\n' \
  --url "http://localhost:8082/<SHORT_ID>"
```

## What just happened?

When you ran `keploy record`, Keploy started your application under its instrumentation and captured the interactions happening while we made those API requests. The requests still went to the real PostgreSQL database, so Keploy could observe both the API request/response and the application's interactions with PostgreSQL.

Keploy then uses these captured interactions to generate the test cases and mocks needed to replay the same flow later. All of this gets stored inside the `keploy` directory.

```text
                         keploy record
                              │
                              ▼
                     ┌─────────────────┐
                     │     Keploy      │
                     │   Record Mode   │
                     │     (eBPF)      │
                     └────────┬────────┘
                              │
                              │ captures & instruments
                              ▼
┌──────────┐        HTTP     ┌────────────────┐
│  Client  │ ──────────────► │ Go Application │
│  (curl)  │                 │                │
│          │ ◄────────────── │ URL Shortener  │
└──────────┘     Response    └───────┬────────┘
                                     │
                            outgoing │ SQL queries
                                     │
                                     ▼
                              ┌─────────────┐
                              │ PostgreSQL  │
                              │     DB      │
                              └──────┬──────┘
                                     │
                              captured by
                                 Keploy
                                     │
                                     ▼
                         ┌─────────────────────┐
                         │   keploy/           │
                         │   ├── tests/        │
                         │   │   └── test-1.yml│
                         │   └── mocks.yaml    │
                         └─────────────────────┘
```

Let's open the `keploy` directory and see what Keploy generated for us. You’ll find the recorded **test cases** containing the API requests and responses, along with **mocks** containing the captured interactions with PostgreSQL. These are the artifacts Keploy will use to replay our requests and verify the application behavior during testing.

Now let's understand what each of these files contains and how Keploy uses them when we run the test.

### Run the captured testcases

Now that we have our testcase captured, run the test file.

```bash
sudo -E PATH=$PATH keploy test -c "./echo-psql-url-shortener"
```

Once you run `keploy test`, Keploy starts the application again and replays the recorded API requests against it. Instead of connecting to the real PostgreSQL database, Keploy uses the mocks captured during recording, so the application gets the same database responses it saw earlier.

Keploy then compares the application's current responses with the recorded responses and reports whether the test passed or failed.
```txt
Recorded testcase
       ↓
keploy test
       ↓
Go application
       ↓
Keploy mocks
       ↓
PostgreSQL responses replayed
       ↓
Compare with recorded response
       ↓
   PASS / FAIL
```

The important part is what we **didn't** have to do: we didn't write the test case, manually create database mocks, or set up PostgreSQL again. We recorded one real interaction, and Keploy turned that interaction into a repeatable integration test. This is what makes the workflow useful as the application grows, adding coverage can start with simply exercising the application rather than manually building every test and its dependency state.