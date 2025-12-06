export const formatPrice = (p) => `${p.toLocaleString('uk-UA')} грн`
export const calcTotal   = (items) => items.reduce((s,i)=>s+i.qty*i.price,0)