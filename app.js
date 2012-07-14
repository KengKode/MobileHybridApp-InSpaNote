var inspaNote = function() {

    var APPKEY = 'inspanote'    // application Key for localStorage
    var notes = [];             // array of inspaNote.Note() objects
    var noteIndex = -1;         // holding current index of editing item

    var syncNotes = function() {   // synchronize notes with localStorage
        localStorage[APPKEY] = JSON.stringify(notes);
    }

    var loadNotes = function() {
        // Implement the following algorithm
        //
        // if localStorage exists:
        //      set data to localStorage[APPKEY]
        //      if data exists:
        //          assign notes = JSON.parse(data)
        //      otherwise:
        //          call syncNotes
        //
        // YOUR CODE SHOULD BEGIN BELOW
        //////////////////////////////////////////////////////////////////






        /////////////////////////////////////////////////////////////////
        // YOUR CODE SHOULD END ABOVE
    };

    var showNotes = function() {

        var list = $('#noteList');  // set alias to #noteList in the DOM
        list.empty();               // empty #noteList

        for(var i = 0; i < notes.length; i++) { // build <li> for all note items
            var note = notes[i];

            // Implement the following algorithm
            //
            // 1. Use Tag Builder to build 2 <a> ( link, sublink ):
            //    for link:
            //      - add attribute: 'href', value= '#'
            //      - add attribute: 'data-noteidx', value= i
            //      - bind event 'click' with the following operation:
            //          - set index to $(this).data('noteidx')
            //          - call editNote(index)
            //      - append note.message to it
            //
            //    for subLink:
            //      - add attribute: 'data-noteidx', value= i
            //      - bind event 'click' with the following operation:
            //          - set index to $(this).data('noteidx')
            //          - call deleteNote(index)
            //
            // 2. Use Tag Builder to build <li>:
            //      - append link, subLink to it
            //
            // 3. Append <li> to #noteList in the DOM via alias
            //
            // YOUR CODE SHOULD BEGIN BELOW
            ///////////////////////////////////////////////////////////////////







            /////////////////////////////////////////////////////////////////
            // YOUR CODE SHOULD END ABOVE
        }

        list.listview('refresh', true);
    };

    var editNote = function(idx) {
        var addMode = (idx == undefined); // True if no passing parameter
        var note = {};
        var pageTitle = (addMode ? 'New Note' : 'Edit Note');

        if(addMode) {
            noteIndex = -1;
            note = new inspaNote.Note();
        } else {
            noteIndex = idx
            note = notes[idx];
        }

        $('#noteMessage').val(note.message);
        $('#editTitle').text(pageTitle);
        $.mobile.changePage('#editPage', {
            transition: 'slide',
            role: 'page'
        });

    };

    var deleteNote = function(idx) {
        notes.splice(idx, 1); // remove object from array at idx location
        syncNotes();
        showNotes();
        $.mobile.changePage('#homePage', {
            transition: 'slide',
            reverse: 'true'
        });
    };


    return {
        Note: function() {
            this.message = '';
        },

        init: function() {
            loadNotes();
            showNotes();
        },

        addNote: function(note) {
            editNote();
        },

        saveNote: function() {
            var note = {};
            if(noteIndex < 0) {
                note = new inspaNote.Note();
                note.message = $('#noteMessage').val();
                notes.push(note);
            } else {
                note = notes[noteIndex];
                note.message = $('#noteMessage').val();
            }
            syncNotes();
            showNotes();
            $.mobile.changePage('#homePage', {
                transition: 'slide',
                reverse: 'true'
            });
        },

        version: '1.0.0'
    };
} ();

$('#homePage').bind('pageinit', function() {
    inspaNote.init();
    
    $('#addNoteButton').bind('click', function() {
        inspaNote.addNote();
    })
});

$('#editPage').live('pageinit', function() {
    $('#saveNoteButton').bind('click', function() {
        inspaNote.saveNote();
    });    
})