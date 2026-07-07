import { useEffect } from 'react';
import Tab from './Tab.jsx';

const scheduleRows = [
  ['Premier semestre', 'Du 4 au 9 janvier 2027', 'Dernière période des contrôles continus'],
  ['Premier semestre', '16 janvier 2027', 'Fin de saisie des notes des contrôles continus'],
  ['Premier semestre', '18 et 19 janvier 2027', 'Passation de l’examen unifié local pour l’obtention du certificat d’études primaires'],
  ['Premier semestre', '20 janvier 2027', 'Fin de saisie des notes de l’examen unifié local'],
  ['Premier semestre', 'À partir du 21 janvier 2027', 'Exportation des données des notes via la plateforme Massar'],
  ['Premier semestre', '21 et 22 janvier 2027', 'Tenue des conseils de classe'],
  ['Premier semestre', '23 janvier 2027', 'Distribution des relevés de notes'],
  ['Deuxième semestre', 'Du 14 au 19 juin 2027', 'Dernière période des contrôles continus'],
  ['Deuxième semestre', '22 juin 2027', 'Fin de saisie des notes des contrôles continus'],
  ['Deuxième semestre', 'Du 21 au 24 juin 2027', 'Préparation collective de l’examen unifié provincial'],
  ['Deuxième semestre', '25 et 26 juin 2027', 'Passation de l’examen unifié provincial pour l’obtention du certificat d’études primaires'],
  ['Deuxième semestre', '30 juin 2027', 'Fin de saisie des notes de l’examen unifié provincial'],
  ['Deuxième semestre', 'À partir du 1er juillet 2027', 'Exportation des données des notes via la plateforme Massar'],
  ['Deuxième semestre', '1er et 2 juillet 2027', 'Tenue des conseils de classe'],
  ['Deuxième semestre', '3 juillet 2027', 'Distribution des relevés de notes']
];

const pageStyle = { boxSizing: 'border-box', width: '210mm', height: '297mm', margin: '36px auto 0', padding: '22mm 16mm', overflow: 'hidden', background: 'white', fontFamily: 'Arial, sans-serif', color: '#111' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', fontSize: '14px' };
const headStyle = { border: '2px solid #111', padding: '10px 8px', background: '#f5f5f5', fontWeight: 900, textAlign: 'center' };
const cellStyle = { border: '1.5px solid #111', padding: '9px 8px', verticalAlign: 'middle', lineHeight: 1.25 };

export default function App() {
  useEffect(() => {
    document.body.classList.add('cahier-tab-active');
    document.body.classList.remove('devoir-tab-active');

    return () => {
      document.body.classList.remove('cahier-tab-active');
    };
  }, []);

  return <>
    <Tab />
    <div className="a4-page cahier-page primary-schedule-page" style={pageStyle}>
      <h1 style={{ margin: '0 0 18px', textAlign: 'center', fontSize: '28px' }}>Calendrier des opérations — Cycle primaire</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...headStyle, width: '20%' }}>Semestre</th>
            <th style={{ ...headStyle, width: '24%' }}>Dates</th>
            <th style={headStyle}>Opérations</th>
          </tr>
        </thead>
        <tbody>
          {scheduleRows.map(([semester, date, operation]) => <tr key={`${semester}-${date}`}>
            <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 800 }}>{semester}</td>
            <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 800 }}>{date}</td>
            <td style={cellStyle}>{operation}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </>;
}
