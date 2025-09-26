// user.jsx
import "../style/user.css"
import Welcome from "../component/welcome.jsx";
import TransactionCard from "../component/transaction-card.jsx"
const User = () => {
  return (
    <main className="user-page">
      <Welcome />
      <TransactionCard
        title="Argent Bank Checking (x8349)"
        amount="2,082.79"
        description="Available Balance"
      />
      <TransactionCard
        title="Argent Bank Savings (x6712)"
        amount="10,928.42"
        description="Available Balance"
      />
      <TransactionCard
        title="Argent Bank Credit Card (x8349)"
        amount="184.30"
        description="Current Balance"
      />
    </main>
  )
}
export default User