import { useState } from 'react';

interface FormNode {
  id: string;
  name: string;
  fields: string[];
  depends_on: string[];
}

interface Props {
  form: FormNode;
  allForms: FormNode[];
}

function FormMapper({ form, allForms }: Props) {
  const [mapping, setMapping] = useState<Record<string, string>>({});

  const availableSources = allForms.filter(f =>
    form.depends_on.includes(f.id)
  );

  const handleMappingChange = (field: string, source: string) => {
    setMapping(prev => ({ ...prev, [field]: source }));
  };

  const handleClear = (field: string) => {
    setMapping(prev => {
      const newMap = { ...prev };
      delete newMap[field];
      return newMap;
    });
  };

  return (
    <div style={{ border: '1px solid #aaa', padding: '1rem', marginTop: '1rem' }}>
      <h3>{form.name} — Prefill Mapping</h3>
      {form.fields.map(field => (
        <div key={field} style={{ marginBottom: '0.5rem' }}>
          <strong>{field}:</strong>{' '}
          <select
            value={mapping[field] || ''}
            onChange={e => handleMappingChange(field, e.target.value)}
          >
            <option value="">Select source field</option>
            {availableSources.map(sourceForm =>
              sourceForm.fields.map(srcField => (
                <option key={`${sourceForm.id}.${srcField}`} value={`${sourceForm.id}.${srcField}`}>
                  {sourceForm.name} → {srcField}
                </option>
              ))
            )}
          </select>
          {mapping[field] && (
            <button onClick={() => handleClear(field)} style={{ marginLeft: '1rem' }}>
              Clear
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default FormMapper;
