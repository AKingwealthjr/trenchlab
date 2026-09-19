import handler from './[action].js';

export default function manualValidateHandler(req: any, res: any) {
  req.query = { ...req.query, action: 'manual-validate' };
  return handler(req, res);
}
