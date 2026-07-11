
const draggable = document.querySelectorAll('.img-item');
const boxes = document.querySelectorAll('.box');
let draggableElement = null;

// Elementos arrastaveis

draggable.forEach(img=>{
    img.addEventListener('dragstart', e =>{
        draggableElement = e.target;
        e.dataTransfer.setData('text/plain', 'image');
        e.dataTransfer.effectAllowed = 'move';

        //Marcar visivelmete
        img.classList.add('dragging')
    });

    img.addEventListener('dragend', ()=>{
        img.classList.remove('dragging');
        draggableElement = null;
    });
});

// Funcao para calcular a posicao de soltar(ordenar drop)
function getDragAfterElement(container, y){
    const draggableElements = [...container.querySelectorAll('.img-item:not(.dragging')];

    return draggableElement.reduce((closest, child) =>{
        const box = child.getBoudingClientRect();
        const offset = y-box.top - box.height / 2
        
        if(offset < 0 && offset > closest.offset){
            return { offset, element: child };
        }
        return closest;
       },
       { offset: Number.NEGATIVE_INFINITY }
    ).element;
}

// Confirmar as caixas como area do drop

boxes.forEach(box=>{
    box.addEventListener('dragover', e=>{
        e.preventDefault();
        const afterElemet = getDragAfterElement(box, e.clientY);
        const draggingEl = document.querySelector('.img-item.dragging');

        if(draggableElement) return;
        if(afterElemet == null){
            // Adicionar no final
            box.appendChild(draggableElement)
        }else{
            //Insere antes do elemento
            box.insertBefore(draggingEl, afterElement);
        }
        box.classList.add('drag-over');
    });
    box.addEventListener('dragleave', () => {
        box.classList.remove('drag-over');
    });
    box.addEventListener('drop', () => {
        box.classList.remove('drag-over');
    });
});