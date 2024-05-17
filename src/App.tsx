import { useState } from 'react'
import styles from './App.module.css'
import poweredImage from './assets/powered.png'

const App = () => {
    const [heightField, setHeightField] = useState(0)
    const [weightField, setWeightField] = useState(0)

    const handleCalculateButton = () => {
        if (heightField && weightField) {

        } else {
            alert("Digite todos os campos!")
        }
    }

    return (
        <div className={styles.main}>
            <header>
                <div className={styles.headerContainer}>
                    <img src={poweredImage} alt="Logo" width={100} />
                </div>
            </header>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <h1>Calcule o seu IMC.</h1>
                    <input
                        type="number"
                        placeholder="Digite a sua altura. Ex: 1,80 (em metros)"
                        value={heightField > 0 ? heightField : ''}
                        onChange={e => setHeightField(parseFloat(e.target.value))}
                    />
                    <input
                        type="number"
                        placeholder="Digite o seu peso. Ex: 80 (em kg)"
                        value={weightField > 0 ? weightField : ''}
                        onChange={e => setWeightField(parseFloat(e.target.value))}
                    />
                    <button onClick={handleCalculateButton}>Calcular</button>
                </div>
                <div className={styles.rightSide}>
                    ...
                </div>
            </div>
        </div>
    )
}

export default App