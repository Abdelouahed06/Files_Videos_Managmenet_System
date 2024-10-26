class StudentFiles extends Main {

    static subjects

    constructor(url, tbodyPath) {
        super(url, tbodyPath)
    }

    setRows(files) {

        let tableBody = ""

        let filesLen = Object.keys(files).length
    
        for(let i = 0; i < filesLen; i++) {
            tableBody += `<tr>
                        <td class="td-${i}">${i+1}</td>
                        <td class="td-${i}" hidden>${files[i].fileId}</td>
                        <td class="td-${i}">${files[i].fileName}</td>
                        <td class="td-${i}">${files[i].description}</td>
                        <td class="td-${i}" hidden>${files[i].subjectId}</td>
                        <td class="td-${i}">${files[i].subject}</td>
                        
                        <td id="operation">
                            <a id="download-${i}" href="${files[i].file}" class="download" download>
                                <i class="fa-solid fa-download fa-fw" data-toggle="tooltip"
                                    title="download"></i>
                            </a>
                        </td>
                    </tr>`              
        }
    
        $(this.tbodyPath).html(tableBody)
        
    }

    

    

    getAllSubjects() {
        $.ajax({
            type: 'GET',
            url: this.url,
            data: {action_num: 3},
            success: (response) => {

                StudentFiles.subjects = JSON.parse(response)
                this.setSelectSubject(StudentFiles.subjects)
        
            },
            error: function(xhr, status, error) {
                console.error(error)
            }
        })
    }

    subjectSelectOptions(subjects) {

        let subjectsLen = Object.keys(subjects).length
    
        let options = ""

        for(let i = 0; i < subjectsLen; i++) {
            options += `<option value="${subjects[i].subject_id}">${subjects[i].subject}</option>`             
        }

        return options

    }

    setSelectSubject(subjects) {
        let options = this.subjectSelectOptions(subjects)
        $('#subject-filter').html('<option value="none" selected>All</option>'+options)  
      
    }

    




}




var studentFiles = new StudentFiles('student_files.php', '#student-files tbody')

isLogedin()

function isLogedin() {
    $.ajax({
        type: 'GET',
        url: "student_files.php",
        data: {action_num: 0},
        success: (response) => {
            if('-1' == response) {
                window.location.href = "login.html"
            } else {
                studentFiles.getAllSubjects()
                studentFiles.getNumOfRows()
            }
           
        },
        error: function(xhr, status, error) {
            console.error(error)
        }
    })
}






// select filter
// $('#class-filter').change(function() { 
//     $('#search-filter').val('')
//     if($('#class-filter').val() == 'none') {
//         teacherFiles.getNumOfFilteredStudents(1)
//     } else {
//         teacherFiles.getNumOfFilteredStudents(2, $('#class-filter').val())
//     }

// })




//---------- Log Out Modal ------------------------------------------
// $('#log-out-li').click(function() { $('#log-out-modal').modal('show') })

// $('#btn-cancel-log-out').click(function() { $('#log-out-modal').modal('hide') })
// $('#btn-close-log-out').click(function() { $('#log-out-modal').modal('hide') })
// $('#btn-log-out').click(function() { 
//     logout()
//     $('#log-out-modal').modal('hide') 
// })
//------------------------------------------------------------------------
