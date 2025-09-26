import { NestFactory } from '@nestjs/core';
import { Worker } from '@temporalio/worker';
import { AppModule } from '../../../app.module';
import * as activities from './activities';

async function run() {
  await NestFactory.createApplicationContext(AppModule);

  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'payment-processing',
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
