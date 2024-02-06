## Overview

This repo is meant to demonstrate the auto-instrumentation of a Nestjs application with OpenTelemetry. Once the application is instrumented with OpenTelemetry, it is sent to SigNoz for monitoring and visualization.

## Steps to instrument Nestjs app with OpenTelemetry

### Setting up SigNoz

You need a backend to which you can send the collected data for monitoring and visualization. [SigNoz](https://signoz.io/) is an OpenTelemetry-native APM that is well-suited for visualizing OpenTelemetry data.

SigNoz cloud is the easiest way to run SigNoz. [Sign up](https://signoz.io/teams/) here for a free account and get 30 days of unlimited access to all features.

### Instrument app with OpenTelemetry

All the required OpenTelemetry packages are in `package.json` file. We have also configured the `tracer.ts` file with the endpoint for SigNoz cloud. You can check detailed instructions [here](https://signoz.io/docs/instrumentation/nestjs/).

### Run your application

Install the packages:

```bash
$ npm install
```

Run your application:

```bash
OTEL_EXPORTER_OTLP_HEADERS="signoz-access-token=<SIGNOZ_INGESTION_KEY>" nest start
```

You can get your ingestion details in SigNoz account under Settings --> Ingestion Settings.

![ingestion-details](https://github.com/SigNoz/sample-NestJs-app/assets/83692067/e20c1978-6fe1-4087-bd82-0407f903d81e)


Now the app will be running at http://localhost:3001  🎉

Make some requests to this application by calling the above URL multiple times. You can then check your NestJS application metrics in SigNoz dashboard.


Sample Nestjs application being monitored in SigNoz:
![sample-nestjs-app-signoz](https://github.com/SigNoz/sample-NestJs-app/assets/83692067/434e3ffe-e226-4d32-8116-6f9fd1866d20)

Out-of-the-box charts for Nestjs application metrics in SigNoz with OpenTelemetry auto-instrumentation:

<img width="1440" alt="opentelemetry-nestjs-app-metrics" src="https://github.com/SigNoz/sample-NestJs-app/assets/83692067/cb800492-da1a-4c47-97eb-b2107141d34b">

OpenTelemetry Nestjs trace data visualized with flamegraphs:

<img width="1440" alt="opentelemetry-nestjs-flamegraphs" src="https://github.com/SigNoz/sample-NestJs-app/assets/83692067/69dac024-0f1c-48f3-b738-b7f156d2c218">



