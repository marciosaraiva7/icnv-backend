import { AnyZodObject } from 'zod'
import { Request, Response, NextFunction } from 'express'

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (error: any) {
      const errorMessages = error.issues.map((issue: any) => issue.message)
      return res.status(400).json({ body: errorMessages })
    }
  }

export default validateResource
