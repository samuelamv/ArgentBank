import "../style/transaction-card.css";

function TransactionCard({ title, amount, description }) {
  return (
    <section className="account">
      <div className="account-content">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">${amount}</p>
        <p className="account-description">{description}</p>
      </div>
      <div className="account-actions">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}

export default TransactionCard;
