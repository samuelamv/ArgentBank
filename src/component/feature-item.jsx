import "../style/feature-item.css";

function FeatureItem({ icon, title, text }) {
  return (
    <div className="feature-item">
      <div className="feature-icon">
        <img src={icon} alt={title} />
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-text">{text}</p>
    </div>
  );
}

export default FeatureItem;
