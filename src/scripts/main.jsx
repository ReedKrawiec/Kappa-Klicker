import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
//HELPER FUNCTIONS
const getRandomInt = (min, max)=>{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const generatecolor = ()=>{
		let color = '#'+Math.floor(Math.random()*16777215).toString(16);
		return color;
}

const gen_random_user = ()=>{
  let words1 = ["nosy","scary","troubled","yummy","quickest","foolish","anxious","grumpy","roasted","tan","successful","tart","tender","mmute","zany","sticky","ratty"];
	let words2 = ["dog","cat","fish","rat","snake","ant","turtle","spider","whale","duck","goose","deer","bear","chimp","snake","crab","pantherrr","Shaggy","Weeaboo"];
  let name = words1[getRandomInt(0,words1.length)]+words2[getRandomInt(0,words2.length)]+getRandomInt(0,201);
  let color = generatecolor();
  return {name,color}
}

//CYCLING
const kappa_generation_loop = () =>{
  let kps = store.getState().kps
  store.dispatch(add_kappa_creator(kps));
}
setInterval(kappa_generation_loop,1000);
setInterval(()=>{store.dispatch({type:"CLEAR_MESSAGES"})},10000);

//COMPONENTS

const BigKappa = (props) => {
  let ref;
  let state = store.getState().kpc;
  const create_floating_text = (amount,x,y) =>{
    let el = document.createElement("div");
    let t = document.createTextNode(`+${amount}`);
    let added_left = (ref.getBoundingClientRect().width - ref.children[0].getBoundingClientRect().width)/2;
    let added_top = (ref.getBoundingClientRect().height - ref.children[0].getBoundingClientRect().height)/2;
    el.appendChild(t);
    ref.appendChild(el);
    el.classList.toggle("floating");
    el.style.top=`${y+added_top}`;
    el.style.left=`${x+added_left}`;
    setTimeout(()=>{el.parentNode.removeChild(el)},1000);
  }
  const onClick = (e)=>{
    store.dispatch({type:"CLICK_KAPPA"});
    create_floating_text(state,e.nativeEvent.offsetX,e.nativeEvent.offsetY);
  }
  return(
    <div ref = {(el)=>{ref = el}} className="main__viewer">
      <img className="viewer__kappa" onClick={onClick} src="assets/images_prod/kappa1.png" alt=""/>
    </div>
  )
}

const KappaKlicker = ()=>{
  let state = store.getState();
  let page_render;
  if(state.current_page === 0){
    page_render = 
      <div>
        <div className="viewer__container">
           <BigKappa/>
        </div>
        <div className="viewer__stats">
          <div className="stats__number stats__number--kpm">KPS {state.kps}</div>
          <div className="stats__number stats__number--kappas">{state.kappas} Kappas</div>
        </div>
      </div>  
  }
  else if(state.current_page === 1){
    let items = [];
    for(let a = 0;a<state.units_data.length;a++)
      items.push(<ShopItem type={0} id={a} />)
    for(let a = 0;a<state.click_upgrades.length;a++){
      items.push(<ShopItemClickUp type={1} id={a} />);
    }  
    page_render = 
    <div>
      <div className="viewer__stats">
          <div className="stats__number stats__number--kpm">KPS {state.kps}</div>
          <div className="stats__number stats__number--kappas">{state.kappas} Kappas</div>
        </div>
      <div className="shop__container">
        {items}
      </div>
    </div>  
  }
  else if(state.current_page === 2){
    page_render = (
      <div className="credits">
        <p>Written by Reed Krawiec</p>
        <p><a href="https://reedkrawiec.github.io">My Website</a></p>
        <p><a href="https://github.com/reedkrawiec">My Github</a></p>
        <p>
          <a href="https://twitch.tv">Kappa and design parodying Twitch.tv</a>
        </p>
      </div>
    );
  }
  return(
    <div className="page">
      <PageNav />
      <div className="page__main">
        {page_render}
      </div>
      <TwitchChat message_array={state.message_array} />
    </div>
  );
}

const ShopItemClickUp = (props)=>{
  let state = store.getState();
  let buy_button;
  if(state.kappas >= state.click_costs[props.id] && state.click_upgrades[props.id] < 1)
    buy_button = <p onClick={()=>{store.dispatch(buy_action_creator(props.type,props.id))}} className="shopitem__buy">+</p>
  return(
    <div className="shopitem">
      {buy_button}
      <p className="shopitem__title">Click Upgrade {props.id+1}</p>
      <div className="shopitem__infocontainer">
        <p className="shopitem__info shopitem__info--cost">Cost:{state.click_costs[props.id]}</p> 
        <p className="shopitem__info shopitem__info--kps">{props.id+2}x Multipliyer</p>      
      </div>
      <div className="shopitem__container">
        <p>Owned:</p> 
        <p className="shopitem__amount">{state.click_upgrades[props.id]}</p>
      </div>
    </div>
  );
}

const ShopItem = (props)=>{
  let state = store.getState();
  let buy_button;
  if(state.kappas >= state.units_data[props.id].cost)
    buy_button = <p onClick={()=>{store.dispatch(buy_action_creator(props.type,props.id))}} className="shopitem__buy">+</p>
  return(
    <div className="shopitem">
      {buy_button}
      <p className="shopitem__title">{state.units_data[props.id].name}</p>
      <div className="shopitem__infocontainer">
        <p className="shopitem__info shopitem__info--cost">Cost:{state.units_data[props.id].cost}</p>
        <p className="shopitem__info shopitem__info--kps">{state.units_data[props.id].generated} Per Second</p>      
      </div>
      <div className="shopitem__container">
        <p>Owned:</p> 
        <p className="shopitem__amount">{state.units[props.id]}</p>
      </div>
    </div>
  );
}

const PageNav = ()=>{
  return(
      <div className="page__nav">
        <div onClick={()=>{store.dispatch(change_page_creator(0))}} className="nav__item nav__item--viewer">Main</div>
        <div onClick={()=>{store.dispatch(change_page_creator(1))}} className="nav__item nav__item--shop">Shop</div>
        <div onClick={()=>{store.dispatch(change_page_creator(2))}} className="nav__item nav__item--viewer">Credits</div>
      </div>
  );
}

const Message = (props)=>{
  let user_data = gen_random_user();
  let badge;
  if(props.badge === 0){
    badge = <img className="message__badge" src="assets/images_prod/TwitchTurbo.png"/>
    user_data.name = "KappaKlicker";
    user_data.color = "indigo";
  }
  else if(props.badge === 1){
    badge = <img className="message__badge" src="assets/images_prod/mod.png"/>
  }
  return(
    <div className="message">
      {badge}
      <span style={{color:user_data.color}}>{user_data.name}:</span><img src="assets/images_prod/kappa1.png" alt="" className="message__kappa"/>
    </div>
  );
}


const TwitchChat = (props)=>{
    let ref = (el) =>{
      if(el!=null){
        el.parentElement.scrollTop = el.clientHeight;
      }
    }
    return(
      <div className="page__chat">
        <div className="chat__header">KlappaStream</div>
        <div className="chat__placeholder"></div>
        <div className="chat__messages" ref={ref}>
          {props.message_array}
        </div>
      </div>
      );
} 

//REDUCER oh golly

let main_reducer = (state = {
  units:[0,0,0,0],
  click_upgrades:[0,0,0,0],
  click_costs:[100,1000,10000,100000],
  message_array:[],
  units_data:[
  {name:"Spammer",cost:100,generated:1},
  {name:"Spam Bot",cost:1000,generated:10},
  {name:"Botnet",cost:10000,generated:100},
  {name:"Super Computer",cost:100000,generated:1000}
  ],
  kappas:0,
  current_page:0,
  kpc:1,
  kps:0
},action)=>{
  let new_kps = 0;
  for(let a = 0;a<state.units.length;a++){
    new_kps+=state.units[a] * state.units_data[a].generated;
  }
  state.kps = new_kps;
  let new_state = Object.assign({},state);
  switch(action.type){
    case "BUY_UNIT":
      new_state.units[action.id]++;
      new_state.kappas-=new_state.units_data[action.id].cost;
      new_state.units_data[action.id].cost = (Math.floor(new_state.units_data[action.id].cost * 1.1))
      return new_state;
    case "BUY_CLICK_UPGRADE":
      new_state.click_upgrades[action.id]++;
      new_state.kappas-=new_state.click_costs[action.id];
      return new_state; 
    case "CLICK_KAPPA":
      let to_add = 1;
      for(let a = 0;a<state.click_upgrades.length;a++){
        if(state.click_upgrades[a] > 0)
          to_add = to_add * (a+2);
      }
      new_state.kpc = to_add;
      new_state.kappas+=to_add;
      if(to_add > 50)
        to_add = 50;
      for(let a= 0;a<to_add;a++)
        state.message_array.push(<Message badge={0} />)
      return new_state;
    case "ADD_KAPPAS":
      new_state.kappas+=action.kappas_added;
      let number_to_add = action.kappas_added;
      if(number_to_add > 50)
        number_to_add = 50;
      for(let a = 0;a<number_to_add;a++){
        new_state.message_array.push(<Message badge={action.badge_num} />);
      }
      return new_state; 
    case "REMOVE_KAPPA":
      new_state.kappas-=action.kappas_removed;
      return new_state;  
    case "CHANGE_PAGE":
      new_state.current_page = action.page_id;
      return new_state;
    case "CLEAR_MESSAGES":
      new_state.message_array = [];
      return new_state;  
  }
  return state;
}

//ACTION CREATORS

const add_kappa_creator = (num,badge)=>{
  return {
    type:"ADD_KAPPAS",
    kappas_added:num,
    badge_num:badge
  }
}

const buy_action_creator = (type,id)=>{
  if(type === 0){
    return {
      type:"BUY_UNIT",
      id:id
    }
  }
  if(type === 1){
    return {
      type:"BUY_CLICK_UPGRADE",
      id:id
    }
  }
}

const change_page_creator = (page)=>{
  return {
    type:"CHANGE_PAGE",
    page_id:page
  }
}

const store = createStore(main_reducer);
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
 <KappaKlicker />,
  rootEl
)

render()
store.subscribe(render);