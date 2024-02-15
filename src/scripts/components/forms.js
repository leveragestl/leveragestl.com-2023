import {gsap} from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

import uploadcare from 'uploadcare-widget'
// import * as LR from '@uploadcare/blocks'
// LR.registerBlocks(LR)

// todo: implement security measures

// Possible enhancements
// todo: animate steps/implement slider?
// todo: Back button?
// todo: validation onBlur?

// =============================================================================
// Helper functions
// =============================================================================
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

function fileTypeLimit(types) {
  types = types.split(' ')

  return function(fileInfo) {
    if (fileInfo.name === null) {
      return
    }
    var extension = fileInfo.name.split('.').pop()

    if (types.indexOf(extension) == -1) {
      throw new Error('fileType')
    }
  }
}

export function formsHandler() {
  const smoother = ScrollSmoother.get()

  const form = document.querySelector(".web3-form")
  const formInner = form.querySelector(".form-inner")
  const result = form.querySelector("#result")
  const parentSection = form.closest('section')

  let scrollOffset
  if(getComputedStyle(form).getPropertyValue('scroll-margin') !== '0px') {
    scrollOffset = getComputedStyle(form).getPropertyValue('scroll-margin-top')
  } else {
    scrollOffset = getComputedStyle(document.body).getPropertyValue('--site-header-height')
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault()
    if (smoother) {
      smoother.scrollTo(`#${parentSection.id}`, true, `top ${scrollOffset}`)
    } else {
      const scrollTarget = parentSection.getBoundingClientRect().top + window.scrollY
      window.scroll(0, scrollTarget - parseInt(scrollOffset))
}
    form.classList.add("was-validated")
    if (!form.checkValidity()) {
      form.querySelectorAll(":invalid")[0].focus()
      return
    }

    // =========================================================================
    // Get/set custom notification data
    // =========================================================================

    let fromStr, subjectStr, titleBool, footerBool
    const formDataFrom = form.getAttribute('data-from')
    const formDataSubject = form.getAttribute('data-subject')
    const nameInput = form.querySelector('input#name')
    const emailInput = form.querySelector('input#email_address')

    titleBool = (form.getAttribute('data-title') === 'false') ? false : true
    footerBool = (form.getAttribute('data-footer') === 'false') ? false : true

    // Rename From value
    fromStr = (nameInput.value.length !== 0) ? nameInput.value : formDataFrom

    // Rename Subject value
    subjectStr = (nameInput.value.length !== 0) ? `${formDataSubject} from ${nameInput.value}` : formDataSubject

    // =========================================================================
    // Prepare form data
    // =========================================================================

    const formData = new FormData(form)

    // Using helper function to capture all checkboxes values that have the same "name" attr and group them into an array
    const object = serialize(formData)

    // Clean up data
    Object.keys(object).forEach(function (item) {

      // Convert any arrays into comma separated strings
      if(Array.isArray(object[item])) {
        object[item] = object[item].join(', ')
      }

      // Delete empty inputs
      if(object[item] === "" || object[item] === null) {
        delete object[item]
      }

      // Delete no file upload
      if (object[item] instanceof File && object[item].size === 0) {
        delete object[item]
      }
    })

    // Append custom notification data
    object["_email"] = {
      from: fromStr,
      subject: subjectStr,
      replyto: emailInput.value,
      template: {
        title: titleBool,
        footer: footerBool,
      }
    }

    const json = JSON.stringify(object)

    result.innerHTML = "Sending..."

    fetch(form.getAttribute('action'), {
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
          result.innerHTML = "Thank you for your submission!"
        } else {
          console.log(response)
          result.classList.add("text-red-500")
          result.innerHTML = "Something went wrong"
        }
      })
      .catch((error) => {
        console.log(error)
        result.innerHTML = "Something went wrong"
      })
      .then(function () {
        form.reset()
        form.classList.remove("was-validated")
        getStep(1)
        setTimeout(() => {
          result.style.display = "none"
          formInner.style.display = ""
        }, 5000)
        if (document.querySelector('[data-uploadcare]')) {
          const widget = uploadcare.Widget("[data-uploadcare]");
          widget.value(null);            
        }
      })
  })

  // ===========================================================================
  // File Size Limit
  // ===========================================================================

  // const inputFiles = document.querySelectorAll('input[type=file]')

  // for (const inputFile of inputFiles) {
  //   inputFile.onchange = function() {
  //     if(this.files[0].size > 2097152){
  //       alert("File exceeds maximum file size limit");
  //       this.value = "";
  //     }
  //   }
  // }
  
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
            if (smoother) {
              smoother.scrollTo(`#${form.id}`, true, `top ${scrollOffset}`)
            } else {
              const scrollTarget = form.getBoundingClientRect().top + window.scrollY
              window.scroll(0, scrollTarget - parseInt(scrollOffset))
            }
          }, 10);
        } else {
          stepSection.classList.add("was-validated")
          // form.querySelectorAll(":invalid")[0].focus()
        }
      })
    }
  }

  // window.addEventListener('scroll', () => {
  //   console.log(window.scrollY);
  // })

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

  // ===========================================================================
  // Uploadcare
  // ===========================================================================

  const inputs = form.querySelectorAll('[data-uploadcare]')
  for (const input of inputs) {
    const widget = uploadcare.Widget(input)

    if (input.getAttribute('data-file-types')) {
      widget.validators.push(fileTypeLimit(input.getAttribute('data-file-types')))
    }

    const button = input.closest('.field').querySelector('button.uploadcare--widget__button_type_open')

    if (input.getAttribute('data-btn-text')) {
      button.innerHTML = input.getAttribute('data-btn-text')
    }    
  }

}