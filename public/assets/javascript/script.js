(function () {

    let addingCard = false
    let currentText = ''


    //dynamically set max-height of list based on window size
    function setHeight() {
        let innerHeight = $(window).height() - 250
        $('.card-data').css('max-height', innerHeight)
    }
    $(document).ready(setHeight())

    $(window).resize(function () {
        setHeight()
    })

    //materialize responsive elements
    $('.sidenav').sidenav()
    $('.tooltipped').tooltip()
    $(".dropdown-trigger").dropdown()



    //add card
    $(document).on('click', '.add-card-btn', function () {
        if (addingCard)
            return

        $('.card-data').animate({
            scrollTop: $('.card-data').prop('scrollHeight')
        }, 1000)

        addingCard = true

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

        $(this).closest('.outer-card').find('.card-data').append(wrapper)
        $('.open-card').focus().select()
    })

    $(document).on('click', '.close-card-wrapper', function () {

        if ($('.open-card').text().trim() !== '' && $(this).siblings('.open-card-btn').text() === 'Done') {

            $('.open-card')
                .text(currentText)

            makeCard()

            $(this)
                .siblings('.open-card-btn')
                .remove()

            $(this)
                .remove()

            addingCard = false

            return
        }

        $(this).closest('.inner-card-wrapper').remove()

        addingCard = false
    })

    function makeCard() {
        let close = $('<i>')
            .addClass('fas fa-times close-btn small-close hover-options close-card-wrapper')
        let edit = $('<i>')
            .addClass('fas fa-edit hover-options')

        $('.open-card p br').remove()
        $('.open-card div br').remove()

        $('.open-card')
            .addClass('closed-card')
            .removeClass('open-card')
            .attr('contenteditable', 'false')
            .append(edit, close)

        addingCard = false
    }

    $(document).on('click', '.board-fav-star', function () {
        if ($(this).text() === 'star_border') {
            $(this).text('star')
        } else {
            $(this).text('star_border')
        }
    })

    $(document).on('click', '.open-card-btn', function () {
        if ($('.open-card').text().trim() === '' && $(this).text() === 'Add')
            return

        if ($('.open-card').text().trim() === '' && $(this).text() === 'Done')
            $(this).closest('.inner-card-wrapper').remove()

        $(this).remove()
        $('.close-open-card').remove()

        makeCard()
    })

    //add list
    $(document).on('click', '.add-list-btn', function () {

        if (addingCard) {
            return
        }

        addingCard = true

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

        addingCard = true

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
            .addClass('material-icons close-btn close-save-list close-card-wrapper')
            .text('close')

        let div = $('<div>')
            .addClass('card-content save-new-list-div')
            .css('display', 'none')
            .append(form, button, close)
    })

    $(document).mouseup(function (event) {
        var container = $('.add-list-card')

        if (!container.is(event.target) && container.has(event.target).length === 0) {
            resetAddList()
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
        addingCard = false
    }

    $(document).on('click', '.close-save-list', function () {
        resetAddList()
    })

    $(document).on('click', '.save-list-btn', function () {

        if ($('#new-list').val().trim() === '') {
            resetAddList()
            return
        } //here animate add cards

        addingCard = false

        let addText = $('<div>')
            .addClass('add-card-btn card-content')
            .text('Add a card...')

        let addCard = $('<div>')
            .addClass('add-card-btn-wrapper grey lighten-3')
            .append(addText)

        let cardData = $('<div>')
            .addClass('card-data')

        let a = $('<a>')
            .addClass('grey grey-text ellipsis-btn right center-align lighten-3 dropdown-trigger')
            .attr({
                'href': '#!',
                'data-target': 'rename-card-dropdown'
            })
            .text('...')

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
            .append(content, addCard)

        resetAddList()

        $('.add-list-card').animate({
            left: '278px'
        }, 500, function () {
            $('.add-list-card').css('left', '0px')
            outerCard.insertBefore('.add-list-card')
            outerCard.fadeIn()
        })

    })

    //edit board title
    $(document).on('click', '.board-title', function () {
        $('.rename-board').show()

        $('#board-rename-input')
            .val($(this).children('.card-content').text())
            .focus()
            .select()
    })

    $(document).on('click', '.close-rename', function () {
        $('.rename-board')
            .hide()
    })

    $(document).mouseup(function (event) {
        var container = $('.rename-board')

        if (!container.is(event.target) && container.has(event.target).length === 0) {
            container.hide()
        }
    })

    $(document).on('click', '.rename-board-btn', function (event) {
        event.preventDefault()

        $('.board-title').children('.card-content').text($('#board-rename-input').val().trim())

        $('.rename-board').hide()
    })

    //edit card content
    $(document).on('click', '.fa-edit', function () {
        if (addingCard) {
            if ($('.open-card').text().trim() === '') {
                $('.open-card').closest('.inner-card-wrapper').remove()
            } else {
                makeCard()
                $('.adding')
                    .remove()
            }
        }

        addingCard = true

        currentText = $(this).parent().text()

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
            .append(button, close)
    })

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

    //rename list
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

    $(document).on('click', '.list-name', function () {
        $(this)
            .attr('contenteditable', 'true')
            .focus()
            .select()
    })

    $(document).mouseup(function (event) {
        var container = $('.list-name')

        if (!container.is(event.target) && container.has(event.target).length === 0) {
            $('.list-name br').remove()

            container
                .attr('contenteditable', 'false')

        }
    })
})() //IIFE