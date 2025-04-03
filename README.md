# Sample NestJs App

This repository contains two sub-projects: `no-code-auto` and `code-level-auto`, both of which integrate with SigNoz Cloud for tracing.

## Folder Structure

```
typescript/
  ├── no-code-auto/
  └── code-level-auto/
```

## Getting Started

### 1. Clone the repository
First, clone this repository to your local machine:

```bash
git clone https://github.com/SigNoz/sample-NestJs-app.git
cd sample-NestJs-app
```

### 2. Install Dependencies

Before running either of the sub-projects, you need to install the dependencies.

```bash
cd typescript
```

---

## Sub-Project 1: no-code-auto

### Instructions to Run

1. Navigate to the `no-code-auto` directory:

    ```bash
    cd no-code-auto
    ```

2. Install the dependencies:

    ```bash
    yarn install
    ```

3. Set the environment variables as follows:

    ```bash
    export OTEL_TRACES_EXPORTER="otlp"
    export OTEL_EXPORTER_OTLP_ENDPOINT="https://ingest.<region>.signoz.cloud:443"
    export OTEL_NODE_RESOURCE_DETECTORS="env,host,os"
    export OTEL_SERVICE_NAME="<service_name>"
    export OTEL_EXPORTER_OTLP_HEADERS="signoz-ingestion-key=<your-ingestion-key>"
    export NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register"
    ```

4. Replace the placeholders:
    - Set `<region>` to match your SigNoz Cloud region.
    - Replace `<your-ingestion-key>` with your SigNoz ingestion key.
    - Replace `<service_name>` with the name of your service.

5. Finally, run the application:

    ```bash
    <your_run_command>
    ```

---

## Sub-Project 2: code-level-auto

### Instructions to Run

1. Navigate to the `code-level-auto` directory:

    ```bash
    cd code-level-auto
    ```

2. Install the dependencies:

    ```bash
    yarn install
    ```

3. Open the `tracing.ts` file and modify the `exporterOptions` configuration:

    ```typescript
    const exporterOptions = {
      //highlight-start
      url: 'https://ingest.<region>.signoz.cloud:443/v1/traces',
      headers: {
        "signoz-access-token": "<your-ingestion-key>"
      }
      //highlight-end
    };
    ```

4. Replace the placeholders:
    - Set `<region>` to match your SigNoz Cloud region.
    - Replace `<your-ingestion-key>` with your SigNoz ingestion key.

5. Once the configuration is updated, you can run the application:

    ```bash
    <your_run_command>
    ```

---

## Troubleshooting

- Ensure that all environment variables are correctly set, particularly the `OTEL_EXPORTER_OTLP_ENDPOINT` and `OTEL_SERVICE_NAME`.
- Verify that your SigNoz Cloud region and ingestion key are correct.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.