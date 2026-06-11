---
type: definition
tags:
  - reactjs
---

conditional rendering, is conditioning the rendering of UI elements , depending on a value (whether is stored in state, or passed as props ). 
```typescript
const component = ()=>{

const condition = false;

return (
<div>
      {
       !condition && <Element/>
      }
</div>
)

}
/** in this example the element will reneder only when the value of condtion is true. */
const component = ()=>{

const condition = false;

return (
<div>
      {
       condition ? <Element/> : <otherElemen/>
      }
</div>
)




```
