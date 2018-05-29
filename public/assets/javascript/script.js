(function () {
    let addingCard = false
    let currentText = ''
    let cardOpen = false
    let updatingListId = null
    let updatingBoardId = null
    let check = false

    //Check if client is mobile browser
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    window.mobileAndTabletcheck = function () {

        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check
    }

    mobileAndTabletcheck()

    if (check) {
        $('.add-list-btn')
            .text('Certain features are unavailable on mobile devices. Please visit this site from a desktop!')
        $('.add-card-btn')
            .text('Feature unavailable via mobile...')
        $('.mobile-note')
            .show()
    }

    //Dynamically set max-height of list based on window size
    //-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
    function setHeight() {
        let innerHeight = $(window).height() - 250
        $('.card-data').css('max-height', innerHeight)
    }
    $(document).ready(setHeight())

    $(window).resize(function () {
        setHeight()
        checkHeight()
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
                let element = $(this).children('.card-data')
                element.append($(ui.draggable))
                element.animate({
                    scrollTop: element.prop('scrollHeight')
                }, 1000)

                updateList($(this).closest('.outer-card')[0].dataset.id, $(ui.draggable)[0].dataset.id, $(ui.draggable).text().trim())
            }
        })

        $('.add-card-btn-wrapper').droppable({
            tolerance: 'intersect',
            accept: '.drag-wrapper',
            activeClass: 'ui-state-default',
            hoverClass: 'ui-state-hover',
            drop: function (event, ui) {
                let element = $(this).siblings('.card-content').children('.card-data')
                element.append($(ui.draggable))
                element.animate({
                    scrollTop: element.prop('scrollHeight')
                }, 1000)
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

        if (addingCard || cardOpen) {
            $('.open-card-btn').closest('.inner-card-wrapper').remove()
        }

        addingCard = true

        cardOpen = true

        let scrollCard = $(this)
            .closest('.outer-card')
            .find('.card-data')

        scrollCard.animate({
            scrollTop: scrollCard.prop('scrollHeight')
        }, 1000)

        let icon = $(this)
            .closest('.outer-card')
            .find('.init-flip')
            .addClass('flip')

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

        let star = 0

        if ($(this).text() === 'star_border') {
            $(this).text('star')
            star = 1
        } else {
            $(this).text('star_border')
        }

        dbUpdate('boards', {
            id: $('.board-wrapper')[0].dataset.id,
            name: $('.board-title').children('.card-content').text(),
            starred: star
        })
    })

    $(document).on('click', '.open-card-btn', function () {
        if ($('.open-card').text().trim() === '' && $(this).text() === 'Add') {
            $(this).closest('.inner-card-wrapper').remove()
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
            $('.open-card-btn').closest('.inner-card-wrapper').remove()
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

        let dynamicClose = $('<i>')
            .addClass('material-icons dynamic-close-btn remove-list-btn')
            .text('close')

        let a = $('<a>')
            .addClass('grey grey-text ellipsis-btn right center-align lighten-3 dropdown-trigger')
            .attr({
                'href': '#!',
                'data-target': `remove-list-${data.id}`
            })
            .append(dynamicClose)

        let floatBtn = $('<a>')
            .addClass('card-scroll btn-floating btn-large waves-effect waves-light red')
            .html('<i class="material-icons">keyboard_arrow_down</i>')
            .attr({
                'id': `list-${data.id}`,
                'data-id': data.id
            })

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
            .append(strong, a)

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
            .append(content, floatBtn, addCard)

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
    $('.modal').modal()

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
        checkHeight()
    })

    function checkHeight() {
        if (window.location.pathname === '/') {
            if ($('.landing-wrapper')[0].scrollHeight > $(window).height() - 100) {
                $('.landing-scroll').removeClass('flip').addClass('animated rotateIn').show()
            } else {
                $('.landing-scroll').removeClass('flip animated rotateIn').fadeOut()
            }
            return
        }

        if (check) {
            $('.card-scroll').removeClass('flip').addClass('animated rotateIn').show()
            return
        }

        let maxHeight = parseInt($('.card-data').css('max-height').replace(/\D/g, ''))

        let lists = $('.active-card').get().map(function (element) {
            let scroll = false

            if (element.children[0].children[1].scrollHeight > maxHeight)
                scroll = true

            let obj = {
                'dataId': element.dataset.id,
                'scrolling': scroll
            }
            return obj
        })

        lists.forEach(item => {
            if (item.scrolling) {
                $(`.card-scroll[data-id="${item.dataId}`).removeClass('flip').addClass('animated rotateIn').show()
            } else if (!item.scrolling) {
                $(`.card-scroll[data-id="${item.dataId}`).removeClass('flip animated rotateIn').fadeOut()
            } else {}
        })
    }

    $(document).on('click', '.card-scroll', function () {

        let icon = $(this).children('i')

        let card = $(this).siblings('.card-content').children('.card-data')

        if (!icon.hasClass('flip')) {

            card.animate({
                scrollTop: card.prop('scrollHeight')
            }, 1000)

            icon.addClass('flip')
        } else {
            icon.removeClass('flip')

            card.animate({
                scrollTop: 0
            }, 1000)
        }
    })

    $(document).on('click', '.landing-scroll', function () {

        let icon = $(this).children('i')

        let card = $(this).closest('.landing-wrapper')

        if (!icon.hasClass('flip')) {

            card.animate({
                scrollTop: card.prop('scrollHeight')
            }, 1000)

            icon.addClass('flip')
        } else {
            icon.removeClass('flip')

            card.animate({
                scrollTop: 0
            }, 1000)
        }
    })

    $(document).mouseup(function () {
        checkHeight()
    })

    $('.card-data').scroll(function () {
        if ($(this).scrollTop() === 0) {
            $(this)
                .closest('.outer-card')
                .find('.init-flip')
                .removeClass('flip')

        } else {
            $(this)
                .closest('.outer-card')
                .find('.init-flip')
                .addClass('flip')
        }
    })

    $('.landing-wrapper').scroll(function () {
        if ($(this).scrollTop() === 0) {
            $(this)
                .find('.init-flip')
                .removeClass('flip')
        } else {
            $(this)
                .find('.init-flip')
                .addClass('flip')
        }
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