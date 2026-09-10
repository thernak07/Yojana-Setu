import { SchemaType } from '@google/generative-ai';

export const UPDATE_MATCHES_TOOL = {
  functionDeclarations: [
    {
      name: 'update_matches',
      description: 'Record the applicant profile and the ranked scheme matches. Call this before every reply.',
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          profile: {
            type: SchemaType.OBJECT,
            description: 'Only fields the user has actually told you.',
            properties: {
              sector: { type: SchemaType.STRING },
              capital: { type: SchemaType.STRING },
              state: { type: SchemaType.STRING },
              category: { type: SchemaType.STRING },
              gender: { type: SchemaType.STRING },
              age: { type: SchemaType.STRING },
              income: { type: SchemaType.STRING },
              registered: { type: SchemaType.STRING },
              disability: { type: SchemaType.STRING },
            },
          },
          matches: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name: { type: SchemaType.STRING },
                agency: { type: SchemaType.STRING, description: 'Implementing agency and ministry.' },
                amount: { type: SchemaType.STRING },
                deadline: { type: SchemaType.STRING },
                fit: { type: SchemaType.INTEGER, description: '0-100 fit score.' },
                status: { type: SchemaType.STRING, enum: ['eligible', 'likely', 'needs_info', 'not_eligible'] },
                confidence: { type: SchemaType.STRING, enum: ['high', 'medium', 'low'] },
                confidence_note: { type: SchemaType.STRING, description: 'Short caution if confidence is not high.' },
                criteria: {
                  type: SchemaType.ARRAY,
                  items: {
                    type: SchemaType.OBJECT,
                    properties: {
                      label: { type: SchemaType.STRING },
                      state: { type: SchemaType.STRING, enum: ['met', 'missed', 'unknown'] },
                    },
                    required: ['label', 'state'],
                  },
                },
              },
              required: ['name', 'agency', 'fit', 'status', 'criteria'],
            },
          },
        },
        required: ['matches'],
      },
    },
  ],
};
