$(document).ready(function(){

    var arrayOfTasks = []; 

    setInterval(InputChecking, 100);

    $('button').click(function(){
        var title = $('.title-input');
        var text = $('.text-input');

        CreateTaskListItem(title, text);

        $('.delete-btn').off('click').click(DeleteTaskListItem);
        $('.close-btn').off('click').click(CloseAndOpenTask);
    });

    function CreateTaskListItem(title, text) { 
        $('.empty-list').remove();

        // ->> TODO
        // ->> ВЫНЕСТИ ОТДЕЛЬНО В ФУНКЦИЮ (отрисовка DOM контента из массива arrayOfTasks)

        var createListTaskContainer = $('<div></div').addClass('list-task-container').attr("id", `${arrayOfTasks.length}`);
        $('.task-list').append(createListTaskContainer);

        var createToolbar = $('<div></div>').addClass('toolbar');
        $(createListTaskContainer).prepend(createToolbar);

        var createToolbarTitle = $(`<h4>${title.val()}</h4>`);
        var createDeleteBtn = $('<img>').addClass('delete-btn').attr('src', 'imgs/clear.png');
        var createCloseBtn = $('<img>').addClass('close-btn').attr('src', 'imgs/down-arrow.png');
        $(createToolbar).prepend(createToolbarTitle, createDeleteBtn, createCloseBtn);

        var createHr = $('<hr>');
        $(createToolbar).after(createHr);

        var createTaskText = $(`<p>${text.val()}</p>`);
        $(createHr).after(createTaskText); 

        $('.list-task-container').fadeIn(200);

        // ВЫНЕСТИ ОТДЕЛЬНО В ФУНКЦИЮ <--
        // TODO <--

        arrayOfTasks.push({id: arrayOfTasks.length, title: title.val(), text: text.val(), containerHeight: $(createListTaskContainer).height()});

        title.val('');
        text.val('');
    }

    function DeleteTaskListItem(){
        let currentId = $(this).parent().parent().attr('id');

        var i = -1;
        while(++i < arrayOfTasks.length) {
            if(arrayOfTasks[i].id == currentId) arrayOfTasks.splice(i--, 1);
        }

        console.log(arrayOfTasks);

        $(this).parent().parent().fadeOut(200, function(){
            $(this).remove();
        });
    }

    function CloseAndOpenTask(){
        if ($(this).hasClass('close-btn')) {
            $(this).parent().parent().animate({
                'height': '20px',
            }, 400)

            $(this).parent().parent().children('p').fadeOut(200);
            $(this).toggleClass('close-btn open-btn');
        }
        else if ($(this).hasClass('open-btn')) {
            let currentId = $(this).parent().parent().attr('id');

            console.log(currentId);
            
            var i = -1;
            while(++i < arrayOfTasks.length) {
                if(arrayOfTasks[i].id == currentId) {
                    var dynamicHeight = $(arrayOfTasks[i].containerHeight);
                }
            }

            $(this).parent().parent().animate({
                'height': `${dynamicHeight[0]}px`,
            }, 400)

            $(this).parent().parent().children('p').fadeIn(200);
            $(this).toggleClass('close-btn open-btn');
        }
    }

    function InputChecking(){
        var title = $('.title-input').val();
        var text = $('.text-input').val();

        if (title.trim() !== '' && text.trim() !== '') $('button').removeAttr('disabled');
        else $('button').attr('disabled', 'disabled');
    }
});