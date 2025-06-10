/*instrumentation.ts*/
import * as opentelemetry from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { metrics } from '@opentelemetry/api';

// Create resource for both traces and metrics
const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME || 'nestjs-app',
  [SemanticResourceAttributes.SERVICE_VERSION]: process.env.SERVICE_VERSION || '1.0.0',
  environment: process.env.NODE_ENV || 'development',
});

// Create metric reader with OTLP exporter
const metricReader = new PeriodicExportingMetricReader({
  exporter: new OTLPMetricExporter({
    url: process.env.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT || 'http://localhost:4318/v1/metrics',
    headers: {
      'signoz-access-token': process.env.SIGNZ_ACCESS_TOKEN || '',
    },
  }),
  exportIntervalMillis: 10000, // Export metrics every 10 seconds
});

// Initialize SDK with traces and metrics
const sdk = new opentelemetry.NodeSDK({
  resource,
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT || 'http://localhost:4318/v1/traces',
    headers: {
      'signoz-access-token': process.env.SIGNZ_ACCESS_TOKEN || '',
    },
  }),
  metricReader,
  instrumentations: [getNodeAutoInstrumentations()],
});

// Start the SDK
sdk.start();

// Create a meter for custom business metrics
const meter = metrics.getMeter('nestjs-app', '1.0.0');

// Example: Counter for tracking user actions
const userSignupCounter = meter.createCounter('user_signups_total', {
  description: 'Total number of user signups',
});

const orderCreatedCounter = meter.createCounter('orders_created_total', {
  description: 'Total number of orders created',
});

// Example: Histogram for tracking business metrics
const orderValueHistogram = meter.createHistogram('order_value_usd', {
  description: 'Distribution of order values in USD',
  unit: 'USD',
});

const paymentProcessingDuration = meter.createHistogram('payment_processing_duration_ms', {
  description: 'Time taken to process payments',
  unit: 'ms',
});

// Example: UpDownCounter for tracking current state
const activeUsersCounter = meter.createUpDownCounter('active_users', {
  description: 'Number of currently active users',
});

const inventoryItemsCounter = meter.createUpDownCounter('inventory_items_count', {
  description: 'Current number of items in inventory',
});

// Example: Observable gauges for business metrics
const pendingOrdersGauge = meter.createObservableGauge('pending_orders_count', {
  description: 'Number of orders pending fulfillment',
});

const revenueRateGauge = meter.createObservableGauge('revenue_rate_per_minute', {
  description: 'Revenue rate in USD per minute',
  unit: 'USD/min',
});

// Simulate business metric observations (replace with actual business logic)
let simulatedPendingOrders = 0;
let simulatedRevenueRate = 0;

meter.addBatchObservableCallback((observableResult) => {
  // In real application, fetch these from your database or cache
  observableResult.observe(pendingOrdersGauge, simulatedPendingOrders);
  observableResult.observe(revenueRateGauge, simulatedRevenueRate);
}, [pendingOrdersGauge, revenueRateGauge]);

// Export metrics for use in application
export { 
  userSignupCounter, 
  orderCreatedCounter, 
  orderValueHistogram, 
  paymentProcessingDuration,
  activeUsersCounter,
  inventoryItemsCounter,
  meter 
};

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry SDK terminated'))
    .catch((error) => console.error('Error terminating SDK', error))
    .finally(() => process.exit(0));
});
