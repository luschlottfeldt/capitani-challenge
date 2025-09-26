export interface WebhookRequestDto {
  type: string;
  action: string;
  data: {
    id: string;
  };
}
