import React from 'react'

import "./ListProduct.sass"

const ListProduct = (props) => {
  return (
    <div className="list-product-container">
        <table className="list-product-table">
            <THead array_header={props.array_header} />
            <TBody arr_product={props.arr_product} />
        </table>
    </div>
  )
}

const THead= (props)=> {
    
    return (
        <thead className="thead-container">
            <tr className="thead-container-tr">
                {
                    props.array_header.map((item, key) => <Th key={key} {...item} />)
                }
            </tr>
        </thead>
    )
}

const Th= (props) => {
    return (
        <th className="th-container">
            <p className="th-container-p">{props.icon}</p>
            <span className="th-container-span">{props.text}</span>
        </th>   
    )
}


export default ListProduct

const TBody= (props)=> {
    
    return (
        <tbody className="tbody-container">
          {
            props.arr_product.map((item, key)=> <Tr key={key} {...item} />)
          }
        </tbody>
    ) 

}

const Tr= (props) => {
    const array_body = props
    return (
        <tr className="tbody-container-tr">
            <Td icon={array_body.icon} text={array_body.text} />
            <Td text={array_body.pop3} />
            <Td text={array_body.live} />
            <Td icon={array_body.flag} />
            <Td text={array_body.cost} />
            <Td text={array_body.cost} />
            <Td button={array_body.button} />
        </tr>
    )
}

const Td= (props)=> {
    return (
        <td className="td-container">
            {
                props.icon &&
                <p className="td-container-p">
                    <img src={props.icon} alt="Icon" className="td-container-img" />
                </p>
            }
            {
                props.text &&
                <span className="td-container-span">{props.text}</span>
            }
            {
                props.button &&
                <div className="td-container-button">{props.button}</div>
            }
        </td>
    )
}