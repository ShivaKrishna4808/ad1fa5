import { useEffect, useState } from 'react';
import FormMapper from './components/FormMapper';



interface FormNode {
  id: string;
  name: string;
  fields: string[];
  depends_on: string[];
}

function App() {
  const [forms, setForms] = useState<FormNode[]>([]);

  useEffect(() => {
    const fetchGraph = async () => {
      // Simulate API data
      const mockData = {
        forms: [
          { id: 'A', name: 'Form A', fields: ['email', 'checkbox'], depends_on: [] },
          { id: 'B', name: 'Form B', fields: ['email'], depends_on: ['A'] },
          { id: 'C', name: 'Form C', fields: ['object'], depends_on: ['A'] },
          { id: 'D', name: 'Form D', fields: ['email', 'checkbox'], depends_on: ['B'] },
          { id: 'E', name: 'Form E', fields: ['email'], depends_on: ['C'] },
        ]
      };
      setForms(mockData.forms);
    };
  
    fetchGraph();
  }, []);
  

  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
const selectedForm = forms.find(f => f.id === selectedFormId);

return (
  <div style={{ padding: 20 }}>
    <h1>Available Forms</h1>
    {forms.length === 0 ? (
      <p>Loading...</p>
    ) : (
      <ul>
        {forms.map(form => (
          <li key={form.id}>
            <button onClick={() => setSelectedFormId(form.id)}>
              {form.name}
            </button>{' '}
            — Depends on: {form.depends_on.join(', ') || 'None'}
          </li>
        ))}
      </ul>
    )}

    {selectedForm && (
      <FormMapper form={selectedForm} allForms={forms} />
    )}
  </div>
);

}

export default App;
