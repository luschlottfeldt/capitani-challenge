import { Injectable } from '@nestjs/common';
import { Client } from '@temporalio/client';
import { paymentProcessingWorkflow, PaymentWorkflowInput } from './workflows';

@Injectable()
export class TemporalService {
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  async startPaymentWorkflow(input: PaymentWorkflowInput): Promise<string> {
    const handle = await this.client.workflow.start(paymentProcessingWorkflow, {
      args: [input],
      taskQueue: 'payment-processing',
      workflowId: `payment-${input.paymentId}`,
    });

    return handle.workflowId;
  }

  async getWorkflowResult(workflowId: string): Promise<any> {
    const handle = this.client.workflow.getHandle(workflowId);
    return await handle.result();
  }
}
