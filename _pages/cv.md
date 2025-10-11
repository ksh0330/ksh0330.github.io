---
layout: cv
permalink: /cv/
title: CV
nav: true
nav_order: 3
cv_pdf: Seunghyun_Kim_CV.pdf # you can also use external links here
description: # This is a description of the page. You can modify it in '_pages/cv.md'. You can also change or remove the top pdf download button.
#toc:
#  sidebar: left
---

<div class="post">
  <header class="post-header">
    <h1 class="post-title">
      {{ page.title }}
      {% if page.cv_pdf %}
        <a
          {% if page.cv_pdf contains '://' %}
            href="{{ page.cv_pdf }}"
          {% else %}
            href="{{ page.cv_pdf | prepend: 'assets/pdf/' | relative_url }}"
          {% endif %}
          target="_blank"
          rel="noopener noreferrer"
          class="float-right"
        >
          <i class="fa-solid fa-file-pdf"></i>
        </a>
      {% endif %}
    </h1>
  </header>

  <article>
    <div class="card mt-3 p-3">
      <h3 class="card-title font-weight-medium">CV Preview</h3>
      <div class="text-center">
        <object 
          data="{{ page.cv_pdf | prepend: 'assets/pdf/' | relative_url }}#toolbar=0&navpanes=0&scrollbar=0" 
          type="application/pdf" 
          width="100%" 
          height="800px"
          style="border: 1px solid #ddd; border-radius: 5px;"
        >
          <p>Your browser does not support PDFs. 
            <a href="{{ page.cv_pdf | prepend: 'assets/pdf/' | relative_url }}" target="_blank">
              Download the PDF instead
            </a>
          </p>
        </object>
      </div>
    </div>
  </article>
</div>