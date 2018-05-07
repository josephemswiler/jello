(function () {

    let addingCard = false
    let currentText = ''


    //dynamically set max-height of list based on window size
    function setHeight() {
        let innerHeight = $(window).height() - 200
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

    $('.add-card-btn-wrapper').hover(function () {
        $(this)
            .toggleClass('lighten-3 lighten-2 underlined')
    })

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

        $('.card-data').append(wrapper)
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
    $(document).on('click', '.add-list-btn', function() {

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

    $(document).on('click', '.rename-board-btn', function(event) {
        event.preventDefault()

        $('.board-title').children('.card-content').text($('#board-rename-input').val().trim())

        $('.rename-board').hide()
    })

    //edit card content
    $(document).on('click', '.fa-edit', function () {
        if(addingCard) {
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