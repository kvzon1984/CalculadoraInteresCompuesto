import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'
import { useState } from 'react'

const compoundInterest = ( deposit, contribution, years, rate) => {
  let total = deposit

  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1)
  }

  return Math.round(total)
}

const formatter = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'})

function App() {
  const [ balance, setBalance ] = useState('')

  const handleSubmit = ({deposit, contribution, years, rate}) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    // console.log(val)
    setBalance(formatter.format(val))
  }
  return (
    <Container>
      <Section>
        <Formik
        initialValues={{
          deposit: '',
          contribution: '',
          years: '',
          rate: '', //? interes
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          deposit: Yup.number().required('Obligatorio').typeError('Debe ser un número'),
          contribution: Yup.number().required('Obligatorio').typeError('Debe ser un número'),
          years: Yup.number().required('Obligatorio').typeError('Debe ser un número'),
          rate: Yup.number().required('Obligatorio').typeError('Debe ser un número').min(0, 'El valor minimo es 0').max(1, 'El valor maximo es 1'),
        })}
        >
          <Form>
            <Input name='deposit' label='Depósito Inicial'/>
            <Input name='contribution' label='Contribucíón Anual'/>
            <Input name='years' label='Años'/>
            <Input name='rate' label='Interés estimado'/>
            <Button type='submit'>Calcular</Button>
          </Form>
        </Formik>
        {balance != '' ? <Balance> Balance final: <span>{balance}</span></Balance> : null}
      </Section>
    </Container>
  )
}

export default App;
