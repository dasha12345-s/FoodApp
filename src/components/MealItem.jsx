import { currencFormatter } from "../util/formatting.js"

export default function MealItem({image, name, price, description}){
  return(
    <li className="meal-item">
    <article>
      <img src={`http://localhost:3000/${image}`} alt={name}/>
    <div>
      <h3>
        {name}
        </h3>
        <p className="meal-item-price">
          {currencFormatter.format(price)}
        </p>
        <p className="meal-item-description">
          {description}
        </p>
    </div>
    <p className="meal-item-action">
    <button>Add to Cart</button>
    </p>
    </article>
    </li>
  ) 
}