import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchCustomers } from './asyncActions/customers';
import { addCashAction, getCashAction } from './store/cashReducer'
import { addCustomerAction, removeCustomerAction } from './store/customerReducer'


function App() {

  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)

  const addCash = (cash) => {
    dispatch(addCashAction(cash))
  }
  const getCash = (cash) => {
    dispatch(getCashAction(cash))
  }

  const addCustomer = (name) => {
    dispatch(addCustomerAction({
      name,
      id: Date.now()
    }))
  }

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id))
  }


  return (
    <div className="App">
      <div className="text">Your balance: {cash}</div>
      <div className="button">

        <button onClick={() => addCash(Number(prompt()))}>
          Add money
        </button>
        <button onClick={() => getCash(Number(prompt()))}>
          Get money
        </button>

        <button onClick={() => addCustomer(prompt())}>
          Add client
        </button>
        <button onClick={() => dispatch(fetchCustomers())}>
          Get clients from data
        </button>

      </div>
      {
        customers.length > 0 ? (
          <div 
            >
            {customers.map(customer =>
              <div 
                onClick={() => removeCustomer(customer)}
                className="text"
              >
                {customer.name}
              </div>
            )}
          </div>
        ) : (
          <div className="text">
            Clients are absent!
          </div>
        )
      }
    </div>
  );
}

export default App;
