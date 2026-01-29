import { useState } from 'react'

const characters: Array<{ gender: string; status: string; age: string }> = [
    { gender: 'Male', status: 'Alive', age: '40' },
    { gender: 'Female', status: 'Alive', age: '38' },
    { gender: 'Male', status: 'Deceased', age: '80' },
    { gender: 'Female', status: 'Unknown', age: '0' },
    { gender: 'Male', status: 'Alive', age: '10' },
]

function countByGender() {
    const m = characters.filter(c => c.gender === 'Male').length
    const f = characters.filter(c => c.gender === 'Female').length
    return `Male: ${m} | Female: ${f} | Otros: ${characters.length - m - f}`
}

function percentageByStatus(s: string) {
    const count = characters.filter(c => (c.status || 'Unknown') === s).length
    const pct = characters.length ? (count / characters.length) * 100 : 0
    return `${s}: ${pct.toFixed(2)}%`
}

function averageAge() {
    const ages = characters.map(c => Number(c.age)).filter(n => n > 0)
    if (!ages.length) return 'No hay edades numéricas'
    const avg = ages.reduce((a, b) => a + b, 0) / ages.length
    return `Promedio: ${avg.toFixed(2)}`
}

export default function EstadisticaPage() {
    const [result, setResult] = useState<string>('')
    const [status, setStatus] = useState<string>('Alive')

    return (
        <div>
            <h3>Estadísticas</h3>

            <div>
                <button onClick={() => setResult(countByGender())}>Contar por género</button>
                <br />
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option>Alive</option>
                        <option>Deceased</option>
                        <option>Unknown</option>
                    </select>
                </div>
                <br />
                <button onClick={() => setResult(percentageByStatus(status))}>Porcentaje por estado</button>
                <br />
                <br />
                <button onClick={() => setResult(averageAge())}>Promedio de edad</button>
            </div>

            <div style={{ marginTop: 12 }}>
                <strong>Resultado:</strong>
                <div>{result}</div>
            </div>
        </div>
    )
}
