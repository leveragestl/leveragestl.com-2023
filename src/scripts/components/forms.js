import {gsap} from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

// todo: animate steps/implement slider?
// todo: Back button?
// todo: validation onBlur?

// Helper Functions
function serialize (data) {
	let obj = {};
	for (let [key, value] of data) {
		if (obj[key] !== undefined) {
			if (!Array.isArray(obj[key])) {
				obj[key] = [obj[key]]
			}
			obj[key].push(value)
		} else {
			obj[key] = value
		}
	}
	return obj
}

export function formsHandler() {
  const form = document.querySelector(".web3-form")
  const formInner = form.querySelector(".form-inner")
  const result = form.querySelector("#result")
  let scrollOffset

  if(getComputedStyle(form).getPropertyValue('scroll-margin') !== '0px') {
    scrollOffset = getComputedStyle(form).getPropertyValue('scroll-margin-top')
  } else {
    scrollOffset = getComputedStyle(document.body).getPropertyValue('--site-header-height')
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault()
    form.classList.add("was-validated")
    if (!form.checkValidity()) {
      form.querySelectorAll(":invalid")[0].focus()
      return
    }

    const nameInput = form.querySelector('input[name=Name]')
    const subjectInput = form.querySelector('input[name=subject]')
    const fromNameInput = form.querySelector('input[name=from_name]')

    // Rename Subject Line
    if (subjectInput && nameInput.value.length !== 0) {
      const subjectInputVal = subjectInput.value
      subjectInput.value = subjectInputVal + ' from ' + nameInput.value    
    }

    // Rename From Name
    if (fromNameInput && nameInput.value.length !== 0) {
      fromNameInput.value = nameInput.value
    }

    const formData = new FormData(form)

    // const object = Object.fromEntries(array)
    const object = serialize(formData)

    Object.keys(object).forEach(function (item) {
      if(Array.isArray(object[item])) {
        object[item] = object[item].join(', ')
      }
    })

    const json = JSON.stringify(object)

    result.innerHTML = "Sending..."

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json()
        if (response.status == 200) {
          formInner.style.display = "none"
          result.style.display = ""
          result.innerHTML = json.message
        } else {
          console.log(response)
          result.classList.add("text-red-500")
          result.innerHTML = json.message
        }
      })
      .catch((error) => {
        console.log(error)
        result.innerHTML = "Something went wrong!"
      })
      .then(function () {
        form.reset()
        form.classList.remove("was-validated")
        getStep(1)
        setTimeout(() => {
          result.style.display = "none"
          formInner.style.display = ""
        }, 5000)
      })
  })

  // ===========================================================================
  // File Size Limit
  // ===========================================================================

  const inputFiles = document.querySelectorAll('input[type=file]')

  for (const inputFile of inputFiles) {
    inputFile.onchange = function() {
      if(this.files[0].size > 2097152){
        alert("File exceeds maximum file size limit");
        this.value = "";
      }
    }
  }
  
  // ===========================================================================
  // Validation
  // ===========================================================================
  const stepSections = document.querySelectorAll('[data-step]')

  for (const stepSection of stepSections) {
    const nextBtn = stepSection.querySelector('[data-btn="next"]')
    let stepBtns = stepSection.querySelectorAll('.step-tab')

    for (const stepBtn of stepBtns) {
      stepBtn.addEventListener('click', () => {
        let target = stepBtn.querySelector('button').getAttribute('data-btn')
        let check = false
        
        if (target !== stepSection.id) {
          target = target.replace('step-', '')
          if (target < stepSection.getAttribute('data-step')) {
            getStep(target)
          } else {
            for (const [i, stepSection] of stepSections.entries()) {
              if (i < target - 1) {
                check = validation(stepSection)
              }
            }
            if (check) {
              getStep(target)
            } else {
              stepSection.classList.add("was-validated")
              // form.querySelectorAll(":invalid")[0].focus()
            }
          }
        }
      })
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        let currentNum = parseInt(stepSection.getAttribute('data-step'))
        let nextNum = currentNum + 1

        if(validation(stepSection)) {
          getStep(nextNum)
          setTimeout(() => {
            console.log('scrollTop')
            ScrollSmoother.get().scrollTo(`#${form.id}`, true, `top ${scrollOffset}`)              
          }, 10);
        } else {
          stepSection.classList.add("was-validated")
          // form.querySelectorAll(":invalid")[0].focus()
        }
      })
    }
  }

  function getStep(target) {
    setTimeout(() => {
      for (const stepSection of stepSections) {
        stepSection.classList.remove('active')
      }
      document.querySelector('[data-step="'+target+'"]').classList.add('active')        
    }, 100);
  }

  function validation(section) {
    const fields = section.querySelectorAll('.field')

    for (const field of fields) {
      let formElem = field.querySelector('input, textarea, select')

      // required fields
      if (formElem.hasAttribute('required')) {
        // input
        if (formElem.nodeName == 'INPUT') {
          if (formElem.value.length == null || formElem.value.length == 0 ) return false
        // textarea
        } else if(formElem.nodeName == 'TEXTAREA') {
          if (formElem.value.length == null || formElem.value.length == 0 ) return false
        // select
        } else if(formElem.nodeName == 'SELECT') {
          if (formElem.value.length == null || formElem.value.length == 0 ) return false
        }
      }

      // email
      if(formElem.getAttribute('type') == 'email' && formElem.value.length !== 0) {
        const regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(!formElem.value.toLowerCase().match(regEx)) return false
      }

      // phone
      if(formElem.getAttribute('type') == 'tel' && formElem.value.length !== 0) {
        const regEx = /^([\+]?1?([ ]|.|-)?[\\(]?([2-9][0-8][0-9])[\\)]?([ ]|.|-)?[0-9]{3}(-|.)?[0-9]{4})$$/
        if(!formElem.value.match(regEx)) return false
      }

    }
    return true
  }
}