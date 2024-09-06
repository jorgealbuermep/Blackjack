/*
2C= 2 club(treboles)
2H= 2 hearts(corazones)
2D= 2 diamonds(diamantes)
2S= 2 spades(espadas)

*/
( ()=>{
   'use strict'
         let deck= [];
      const tipos=['C','D','H','S'],
       especiales=['A','J','Q','K'];
      let puntosjugagor=0, puntoscomputadora=0;

      //referencias html
      const btnNuevo= document.querySelector('#btnNuevo'),
       btnPedirCarta= document.querySelector('#btnPedirCarta');
      const btnDetener= document.querySelector('#btnDetener');
      let smPuntos= document.querySelectorAll('small');
      const divJugadorCartas= document.querySelector('#jugador-cartas'),
       divComputadorCartas=document.querySelector('#computador-cartas');

      //crear deck
      const crearDeck = () =>{
      for(let i=2; i<=10; i++){
         for(let tipo of tipos){
         deck.push(i + tipo);
         }
      }

      for(let tipo of tipos){
         for(let esp of especiales){
         deck.push(esp + tipo);

         }
      }
      
      deck= _.shuffle(deck);

      return deck;
      }

      crearDeck();

      //funcion para pedir una carta

      const pedirCarta= ()=>{
         if(deck.length===0){
            throw'no hay cartas en el deck';
         }
         const carta= deck.pop();
         console.log(deck);
         return carta;
         turnoComputadora(puntosjugagor) // modificacion aca//////////////
      }

      const valorCarta=(carta)=>{
         const valor=carta.substring(0, carta.length-1);
         return(isNaN(valor))?
         valor==='A'? 11:10
         :valor*1;
      }
      // logica de la computadora

      const turnoComputadora = (puntosminimos)=>{

         do{
            const carta=pedirCarta();
            puntoscomputadora= puntoscomputadora + valorCarta(carta);
            smPuntos[1].innerHTML=puntoscomputadora;
            const imgcarta= document.createElement('img');
            imgcarta.src=`assets/cartas/${carta}.png`;
            imgcarta.classList.add('carta');
            divComputadorCartas.append(imgcarta);

            if(puntosminimos>21){
               break;
            }
            
         } 
         while((puntoscomputadora<puntosminimos) && (puntosminimos<=21));
         setTimeout(() => {
            if(puntosjugagor=== puntoscomputadora){
               //alert('el juego ha quedado empate!');
               Swal.fire({
                  title: '¡Empate!⚖️⚖️',
                  text: 'El juego ha quedado empate',
                  icon: 'warning',
                  confirmButtonText: 'OK'
                });
            }else if((puntosjugagor<puntoscomputadora) &&(puntoscomputadora>21)){
               //alert('has ganado el juego! :)');
               Swal.fire({
                  title: '¡Genial!🔥🔥',
                  text: '¡Ganaste!',
                  icon: 'success',
                  confirmButtonText: 'OK'
                });
            }
            else if((puntosjugagor>puntoscomputadora)&&(puntosjugagor<=21)){
            //alert('has perdido el juego :(');
            Swal.fire({
               title: '¡Oh no!💣💣',
               text: ' Has perdido el juego!',
               icon: 'error',
               confirmButtonText: 'OK'
             });
            }
            else{
              // alert('has perdido el juego :(');
              Swal.fire({
               title: '¡ Oh no!💣💣',
               text: ' Has perdido el juego ',
               icon: 'error',
               confirmButtonText: 'OK'
             });
              
            }
         }, 15);

      }
      const carta=pedirCarta();


      const valor=valorCarta(pedirCarta());
      //console.log(valor);

      //Eventos

      btnPedirCarta.addEventListener('click', ()=>{
      const carta=pedirCarta();
      puntosjugagor= puntosjugagor+valorCarta(carta);
      smPuntos[0].innerHTML=puntosjugagor;
      const imgcarta= document.createElement('img');
      imgcarta.src=`assets/cartas/${carta}.png`;
      imgcarta.classList.add('carta');
      //console.log(puntosjugagor);
      divJugadorCartas.append(imgcarta);
      
      if(puntosjugagor>21){
         btnPedirCarta.disabled=true;
         btnDetener.disabled=true;
         turnoComputadora(puntosjugagor);
      
      }else if(puntosjugagor===21){
         btnPedirCarta.disabled=true;
         btnDetener.disabled=true;
         turnoComputadora(puntosjugagor);
      
      }
      });

      btnDetener.addEventListener('click', ()=>{
         btnPedirCarta.disabled=true;
         btnDetener.disabled=true;
         turnoComputadora(puntosjugagor);

      });

      btnNuevo.addEventListener('click', ()=>{
         
         deck=[];
         crearDeck();
         //console.log(deck);

         puntosjugagor=0;
         puntoscomputadora=0;
         smPuntos[0].innerText=0;
         smPuntos[1].innerText=0;
         divJugadorCartas.innerHTML='';
         divComputadorCartas.innerHTML='';
         btnDetener.disabled=false;
         btnPedirCarta.disabled=false;
      

      }); 

   

})();
