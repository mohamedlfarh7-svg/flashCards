const question = document.getElementById('question');
        const reponse = document.getElementById('reponse');
        const wrapper = document.querySelector('.wrapper');
        const submit = document.getElementById('submit');
        const collection = document.getElementById('collection');
        const addCollection = document.getElementById('addCollection');
        const nomCollection = document.getElementById('nomCollection');
        const backToCollections = document.getElementById('backToCollections');
        let currentCollection = '';

        let collections = JSON.parse(localStorage.getItem('collects')) || [];
        addCollection.onclick = function(event){
            event.preventDefault();
            if(nomCollection.value.trim()===""){
                alert('enter a name of collection');
                return;
            }
            const newCollection = {
                collection : nomCollection.value 
            }
            collections.push(newCollection);
            localStorage.setItem('collects', JSON.stringify(collections));
            nomCollection.value='';
            showCollection();
        };

        function showCollection(){
            collection.innerHTML = '';
            if(collections.length===0){
                collection.style.display='none';
                return
            }
            collection.style.display='flex';

            const deleteAll = document.getElementById('deleteAllCollections')
            if(collections.length>0){
                deleteAll.innerHTML=`
                        <button onclick="deleteAlls()"class="deletAll">deleteAll</button>
                `
            }else{
                deleteAll.innerHTML='';
           }

            for(let i=0 ; i<collections.length ;i++){
                const collectionHTML = `
                    <div class="collect">
                        <h2 class="nomCollection">${collections[i].collection}</h2>
                        <button onclick="showCardsCollection('${collections[i].collection}')" class="showCards">showCards</button>
                    </div>
                `;
                collection.innerHTML +=collectionHTML;
            }
        };

        function showCardsCollection(name) {
            currentCollection = name;
            document.getElementById('formCollection').style.display='none';
            document.getElementById('collection').style.display = 'none';
            document.getElementById('deleteAllCollections').style.display = 'none';
            document.getElementById('cardForm').style.display = 'flex';
            document.getElementById('deleteAllCards').style.display = 'flex';
            backToCollections.style.display = 'block';
            showCards();
        }

        backToCollections.onclick = function(){
            document.getElementById('cardForm').style.display = 'none';
            document.getElementById('deleteAllCards').style.display = 'none';
            backToCollections.style.display = 'none';
            document.getElementById('collection').style.display = 'flex';
            document.getElementById('deleteAllCollections').style.display = 'flex';
            document.getElementById('formCollection').style.display='flex';
            wrapper.innerHTML = '';
        }

        function deleteAlls(){
            if (confirm("Are you sure you want to delete all collections?")) {
                collections.splice(0);
                localStorage.removeItem('collects');
                showCollection();
            }
        };
        window.onload = showCollection;

        let cards = JSON.parse(localStorage.getItem('cardes')) || [];
        submit.onclick = function (event) {
            event.preventDefault();

            if (question.value.trim() === "" || reponse.value.trim() === "") {
                alert("Enter a value");
                return;
            }

            const newCard = {
                frontQuestion: question.value,
                backReponse: reponse.value,
                collection: currentCollection 
            };

            cards.push(newCard);
            localStorage.setItem('cardes', JSON.stringify(cards));

            question.value = '';
            reponse.value = '';

            showCards();
        };

        // function showCards() {
        //     wrapper.innerHTML = '';

        //     if (cards.length === 0) {
        //         wrapper.style.display = "none";
        //         return;
        //     }

        //     wrapper.style.display = "flex";
        //     const deleteAll = document.getElementById('deleteAllCards')
        //     if(cards.length>0){
        //         deleteAll.innerHTML=`
        //                 <button onclick="deleteAll()"class="deletAll">deleteAll</button>
        //         `
        //     }else{
        //         deleteAll.innerHTML='';
        //    }

        //     for (let i = 0; i < cards.length; i++) {
        //         if (cards[i].collection !== currentCollection) continue;
        //         const cardHTML = `
        //             <div class="card">
        //                 <div class="front">
        //                     <div class="card-info">
        //                         <h2>${cards[i].frontQuestion}</h2>
        //                     </div>
        //                 </div>
        //                 <div class="back">
        //                     <div class="card-content">
        //                         <p>${cards[i].backReponse}</p>
        //                         <button onclick="deleteCard(${i})" class="card-btn">delete</button>
        //                     </div>
        //                 </div>
        //             </div>
        //         `;
        //         wrapper.innerHTML += cardHTML;
        //     }
        // };
 
        function deleteCard(i){
            cards.splice(i,1);
            localStorage.cardes = JSON.stringify(cards);
            showCards();
        };

        function deleteAll(){
            if (confirm("Are you sure you want to delete all cards?")) {
                cards.splice(0);
                localStorage.removeItem('cardes');
                showCards();
            }
        };