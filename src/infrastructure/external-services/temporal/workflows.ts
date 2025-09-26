import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { processPayment, updatePaymentStatus } = proxyActivities<
  typeof activities
>({
  startToCloseTimeout: '5 minutes',
  retry: {
    initialInterval: '1 second',
    backoffCoefficient: 2.0,
    maximumInterval: '10 minutes',
    maximumAttempts: 3,
  },
});

export interface PaymentWorkflowInput {
  paymentId: string;
  amount: number;
  paymentMethod: string;
}

export async function paymentProcessingWorkflow(
  input: PaymentWorkflowInput,
): Promise<void> {
  try {
    if (input.paymentMethod === 'CREDIT_CARD') {
      await processPayment(input.paymentId);
    }

    await updatePaymentStatus(input.paymentId, 'PAID');
  } catch (error) {
    await updatePaymentStatus(input.paymentId, 'FAIL');
    throw error;
  }
}
