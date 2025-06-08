import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { documentInternationalization } from '@sanity/document-internationalization';

import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'krishnaveni',

  projectId: 'jzbduz09',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'hi', title: 'Hindi' },
        { id: 'te', title: 'Telugu' },
      ],
      schemaTypes: schemaTypes.map((type) => type.name),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
