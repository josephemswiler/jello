(function () {
    let addingCard = false
    let currentText = ''
    let cardOpen = false
    let updatingListId = null
    let updatingBoardId = null

    //Dynamically set max-height of list based on window size
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    function setHeight() {
        let innerHeight = $(window).height() - 250
        $('.card-data').css('max-height', innerHeight)
    }
    $(document).ready(setHeight())

    $(window).resize(function () {
        setHeight()
    })

    //jQuery UI
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    function initDrag() {

        $('.drag-wrapper').draggable({
            appendTo: 'body',
            cursor: 'move',
            helper: 'clone',
            revert: 'invalid'
        })

        $('.card-content').droppable({
            tolerance: 'intersect',
            accept: '.drag-wrapper',
            activeClass: 'ui-state-default',
            hoverClass: 'ui-state-hover',
            drop: function (event, ui) {
                $(this).children('.card-data').append($(ui.draggable))
                updateList($(this).closest('.outer-card')[0].dataset.id, $(ui.draggable)[0].dataset.id, $(ui.draggable).text().trim())
            }
        })

        $('.add-card-btn-wrapper').droppable({
            tolerance: 'intersect',
            accept: '.drag-wrapper',
            activeClass: 'ui-state-default',
            hoverClass: 'ui-state-hover',
            drop: function (event, ui) {
                $(this).siblings('.card-content').children('.card-data').append($(ui.draggable))
                updateList($(this).closest('.outer-card')[0].dataset.id, $(ui.draggable)[0].dataset.id, $(ui.draggable).text().trim())
            }
        })
    }

    initDrag()

    $(document).ajaxComplete(function () {
        initDrag()
    })

    function updateList(listId, cardId, cardText) {
        dbUpdate('cards', {
            id: cardId,
            text: cardText,
            list_id: listId,
            starred: 0
        })
    }

    //Card - Create
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    $(document).on('click', '.add-card-btn', function () {

        if (addingCard)
            return

        addingCard = true

        if (cardOpen)
            return

        cardOpen = true

        $('.card-data').animate({
            scrollTop: $('.card-data').prop('scrollHeight')
        }, 1000)

        let p = $('<p>')
            .addClass('open-card')
            .attr('contenteditable', 'true')
        let content = $('<div>')
            .addClass('card-content')
            .append(p)
        let div = $('<div>')
            .addClass('card inner-card')
            .append(content)
        let close = $('<i>')
            .addClass('material-icons adding close-btn close-open-card close-card-wrapper')
            .text('close')
        let button = $('<button>')
            .addClass('open-card-btn adding waves-effect waves-light btn green darken-1 white-text')
            .text('Add')
        let wrapper = $('<div>')
            .addClass('inner-card-wrapper')
            .append(div)
            .append(button, close)

        $(this).closest('.outer-card')
            .find('.card-data')
            .append(wrapper)

        $('.open-card')
            .focus()
            .select()
    })

    function makeCard(data) {
        let close = $('<i>')
            .addClass('fas fa-times close-btn small-close hover-options close-card-wrapper')
        let edit = $('<i>')
            .addClass('fas fa-edit hover-options')

        $('.open-card p br').remove()
        $('.open-card div br').remove()

        $('.open-card')
            .closest('.inner-card-wrapper')
            .attr({
                'id': `card-${data.id}`,
                'data-id': data.id,
            })

        $('.open-card')
            .addClass('closed-card')
            .removeClass('open-card')
            .attr(
                'contenteditable', 'false'
            )
            .append(edit, close)

        addingCard = false

        cardOpen = false

        initDrag()
    }

    $(document).on('click', '.board-fav-star', function () {
        if ($(this).text() === 'star_border') {
            $(this).text('star')
        } else {
            $(this).text('star_border')
        }
    })

    $(document).on('click', '.open-card-btn', function () {
        if ($('.open-card').text().trim() === '' && $(this).text() === 'Add') {
            addingCard = false
            cardOpen = false
            return
        }

        if ($('.open-card').text().trim() === '' && $(this).text() === 'Done') {
            dbDelete('cards', $(this).closest('.inner-card-wrapper')[0].dataset.id)
            $(this).closest('.inner-card-wrapper').remove()
            addingCard = false
            cardOpen = false
            return
        }

        if ($(this).text() === 'Add') {
            dbCreateCard('cards', {
                text: $('.open-card').text().trim(),
                list_id: $(this).closest('.active-card')[0].dataset.id
            })
            $(this)
                .closest('.inner-card-wrapper')
                .addClass('drag-wrapper ui-draggable ui-draggable-handle')
        }

        if ($(this).text() === 'Done') {
            dbUpdate('cards', {
                id: $(this).closest('.inner-card-wrapper')[0].dataset.id,
                text: $('.open-card').text().trim(),
                list_id: $(this).closest('.active-card')[0].dataset.id,
                starred: 0
            })
            makeCard({
                id: $(this).closest('.inner-card-wrapper')[0].dataset.id
            })
            $(this)
                .closest('.inner-card-wrapper')
                .addClass('drag-wrapper ui-draggable ui-draggable-handle')
                .draggable('enable')
        }



        $(this)
            .remove()
        $('.close-open-card')
            .remove()
    })

    //Card - Update
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    $(document).on('click', '.fa-edit', function () {

        currentText = $(this).parent().text().trim()

        if (addingCard) {
            if ($('.open-card').text().trim() === '') {
                $('.open-card').closest('.inner-card-wrapper').remove()
            } else {
                makeCard({
                    id: $('.open-card').closest('.inner-card-wrapper')[0].dataset.id
                })
                $('.adding')
                    .remove()
            }
        }

        addingCard = true

        cardOpen = true

        let button = $('<button>')
            .addClass('open-card-btn waves-effect waves-light btn green darken-1 white-text')
            .text('Done')

        let close = $('<i>')
            .addClass('material-icons close-btn close-open-card close-card-wrapper')
            .text('close')

        $('.hover-options').hide()

        $(this)
            .parent()
            .removeClass('closed-card')
            .addClass('open-card')

        $(this)
            .parent()
            .attr('contenteditable', 'true')
            .focus()
            .select()

        $(this)
            .closest('.inner-card-wrapper')
            .draggable('disable')
            .append(button, close)
    })

    //Card - Delete
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    $(document).on('click', '.close-card-wrapper', function () {

        if ($('.open-card').text().trim() !== '' && $(this).siblings('.open-card-btn').text() === 'Done') {

            makeCard({
                id: $('.open-card')[0].dataset.id
            })

            $(this)
                .closest('.inner-card-wrapper')
                .addClass('drag-wrapper ui-draggable ui-draggable-handle')
                .draggable('enable')

            $(this)
                .siblings('.open-card-btn')
                .remove()

            $(this)
                .remove()

            addingCard = false

            cardOpen = false

            return
        }

        dbDelete('cards', $(this).closest('.inner-card-wrapper')[0].dataset.id)

        $(this).closest('.inner-card-wrapper').remove()

        addingCard = false

        cardOpen = false
    })

    //List - Create
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    $(document).on('click', '.add-list-btn', function () {

        if (cardOpen) {
            return
        }

        addingCard = true

        cardOpen = true

        $(this).closest('.add-list-card').animate({
            backgroundColor: 'rgba(238,238,238,1)',
            height: '150px'
        }, 500, function () {
            $(this)
                .closest('.add-list-card')
                .append(div)

            div.fadeIn(function () {
                $('#new-list')
                    .focus()
                    .select()
            })
        })

        $(this).animate({
            opacity: 0
        }, 500, function () {
            $(this)
                .hide()
        })

        let label = $('<label>')
            .attr('for', 'new-list')
            .text('Add a list...')

        let input = $('<input>')
            .attr({
                'id': 'new-list',
                'type': 'text'
            })

        let field = $('<div>')
            .addClass('input-field')
            .append(input, label)

        let form = $('<form>')
            .append(field)

        let button = $('<button>')
            .addClass('save-list-btn waves-effect waves-light btn green darken-1 white-text')
            .text('Save')

        let close = $('<i>')
            .addClass('material-icons close-btn close-save-list')
            .text('close')

        let div = $('<div>')
            .addClass('card-content save-new-list-div')
            .css('display', 'none')
            .append(form, button, close)
    })

    $(document).mouseup(function (event) {
        let container = $('.add-list-card')

        if (!container.is(event.target) && container.has(event.target).length === 0) {
            resetAddList()
            cardOpen = false
        }
    })

    function resetAddList() {
        $('.save-new-list-div').fadeOut(function () {
            $('.add-list-card').animate({
                backgroundColor: 'rgba(0, 0, 0, .2)',
                height: '40px'
            }, 500, function () {
                $('.save-new-list-div').remove()
            })

            $('.add-list-btn').show()
            $('.add-list-btn').animate({
                opacity: 1
            }, 500)
        })
    }

    $(document).on('click', '.close-save-list', function () {
        resetAddList()
        cardOpen = false
        addingCard = false
    })

    $(document).on('click', '.save-list-btn', function () {

        if ($('#new-list').val().trim() === '') {
            resetAddList()
            cardOpen = false
            return
        }

        addingCard = false

        cardOpen = false

        dbCreateList('lists', {
            name: $('#new-list').val().trim(),
            board_id: $(this).closest('.card-wrapper').siblings('.board-wrapper')[0].dataset.id
        })
    })

    function makeList(data) {

        let addText = $('<div>')
            .addClass('add-card-btn card-content')
            .text('Add a card...')

        let addCard = $('<div>')
            .addClass('add-card-btn-wrapper grey lighten-3')
            .append(addText)

        let cardData = $('<div>')
            .addClass('card-data')

        let strong = $('<strong>')
            .addClass('list-name')
            .attr('contenteditable', 'true')
            .text($('#new-list').val().trim())

        let name = $('<div>')
            .addClass('card-name')
            .append(strong)

        let content = $('<div>')
            .addClass('card-content grey lighten-3')
            .append(name, cardData)

        let outerCard = $('<div>')
            .css('display', 'none')
            .addClass('card outer-card active-card')
            .attr({
                'id': `list-${data.id}`,
                'data-id': data.id
            })
            .append(content, addCard)

        resetAddList()

        $('.add-list-card').animate({
            left: '278px'
        }, 500, function () {
            $('.add-list-card').css('left', '0px')
            outerCard.insertBefore('.add-list-card')
            outerCard.fadeIn()
        })
    }

    //List - Update
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//  
    $(document).on('click', '.list-name', function () {

        updatingListId = $(this).closest('.outer-card')[0].dataset.id
        currentText = $(this).text()

        $(this)
            .attr('contenteditable', 'true')
            .focus()
            .select()
    })

    $(document).mouseup(function (event) {
        let container = $('.list-name')

        if (!container.is(event.target) && container.has(event.target).length === 0) {
            $('.list-name br').remove()

            container
                .attr('contenteditable', 'false')

            if ($(`.card-wrapper [data-id="${updatingListId}"] strong`).text().trim() === '') {
                $(`.card-wrapper [data-id="${updatingListId}"] strong`).text(currentText)
            }

            dbUpdate('lists', {
                id: updatingListId,
                name: $(`.card-wrapper [data-id="${updatingListId}"] strong`).text().trim(),
                starred: 0
            })

            currentText = ''

            updatingListId = null
        }
    })

    //List - Delete
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    $(document).on('click', '.remove-list-btn', function () {

        dbDelete('lists', $(this).closest('.outer-card')[0].dataset.id)

        $(this).closest('.outer-card').fadeOut(function () {
            $(this).closest('.outer-card').remove()
        })

    })

    //Board - Create
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//

    $(document).on('click', '.add-board', function () {
        dbCreateBoard('boards', {
            name: 'New Board'
        })
    })

    function makeBoard(data) {
        window.location.replace(`/${data.id}`)
    }

    //Board - Update
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    $(document).on('click', '.board-title', function () {
        $('.rename-board')
            .show()

        $('#board-rename-input')
            .val($(this).children('.card-content').text())
            .focus()
            .select()

        currentText = $('#board-rename-input').val()

        updatingBoardId = $('.board-wrapper')[0].dataset.id
    })

    $(document).on('click', '.close-rename', function () {
        $('.rename-board')
            .hide()
    })

    $(document).mouseup(function (event) {
        let container = $('.rename-board')

        if (!container.is(event.target) && container.has(event.target).length === 0) {
            container.hide()
        }
    })

    $(document).on('click', '.rename-board-btn', function (event) {
        event.preventDefault()

        if ($('#board-rename-input').val().trim() === '') {
            $('.board-title').children('.card-content').text(currentText)
        } else {
            $('.board-title').children('.card-content').text($('#board-rename-input').val().trim())
        }

        dbUpdate('boards', {
            id: updatingBoardId,
            name: $('.board-title').children('.card-content').text(),
            starred: 0
        })

        $(`.nav-boards[data-id="${updatingBoardId}"]`).text($('.board-title').children('.card-content').text())

        currentText = ''

        updatingBoardId = null

        $('.rename-board').hide()
    })

    //Board - Delete
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    $(document).on('click', '.delete-board-btn', function (event) {
        event.preventDefault()

        let boardLists = $('.active-card').get().map(function (element) {
            return element.dataset.id
        })

        boardLists.forEach(id => dbDelete('lists', id))

        window.location.replace('/')
    })

    $(document).ready(function () {
        if (window.location.pathname !== '/')
            return

        $.get('/api/all').then(data => {
            data.forEach(board => {
                if (board.Lists.length === 0) {
                    dbDelete('boards', board.id)
                    $(`.nav-boards[data-id="${board.id}"]`).closest('li').remove()
                }
            })
        })
    })

    //Materialize - Responsive Elements & Additional Scripting
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    $('.sidenav').sidenav()
    $('.tooltipped').tooltip()
    $('.dropdown-trigger').dropdown()

    $(document).on('mouseenter', '.add-card-btn-wrapper', function () {
        $(this)
            .toggleClass('lighten-3 lighten-2 underlined')
    })

    $(document).on('mouseleave', '.add-card-btn-wrapper', function () {
        $(this)
            .toggleClass('lighten-3 lighten-2 underlined')
    })

    $(document).on('mouseenter', '.closed-card', function () {
        $(this)
            .children('.hover-options')
            .show()
    })

    $(document).on('mouseleave', '.closed-card', function () {
        $(this)
            .children('.hover-options')
            .hide()
    })

    $(document).on('mouseenter', '.ellipsis-btn', function () {
        $(this)
            .removeClass('lighten-3')
            .addClass('lighten-2')
    })

    $(document).on('mouseleave', '.ellipsis-btn', function () {
        $(this)
            .addClass('lighten-3')
            .removeClass('lighten-2')
    })

    $(document).ready(function () {
        $('.board-wrapper').fadeIn('slow')
        $('.card-wrapper').fadeIn('slow')
        $('.landing-wrapper').fadeIn('slow')
    })

    //db CRUD Functions
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    function dbCreateCard(table, object) {
        $.post(`/api/${table}`, object, function (data) {
            return data
        }).then(data => makeCard(data))
    }

    function dbCreateList(table, object) {
        $.post(`/api/${table}`, object, function (data) {
            return data
        }).then(data => makeList(data))
    }

    function dbCreateBoard(table, object) {
        $.post(`/api/${table}`, object, function (data) {
            return data
        }).then(data => makeBoard(data))
    }

    function dbRead(table) {
        $.get(`/api/${table}`, function (data) {}).then(data => readData(data))
    }

    function dbUpdate(table, object) {
        $.ajax({
            method: 'PUT',
            url: `/api/${table}`,
            data: object
        }).then(function (data) {})
    }

    function dbDelete(table, id) {
        $.ajax({
            method: 'DELETE',
            url: `/api/${table}/${id}`
        }).then(function (data) {})
    }
})() //IIFE