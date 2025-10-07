---
layout: default
permalink: /blog/
title: Blog
nav: true
nav_order: 2
redirect: https://velog.io/@ksh0330/posts
---

<script>
  // Velog 블로그로 리다이렉트
  window.location.href = "https://velog.io/@ksh0330/posts";
</script>

<div class="post">
  <div class="header-bar">
    <h1>{{ site.blog_name }}</h1>
    <h2>{{ site.blog_description }}</h2>
  </div>
  
  <div class="text-center" style="padding: 50px 0;">
    <h3>블로그로 이동 중...</h3>
    <p>잠시만 기다려주세요. Velog 블로그로 이동합니다.</p>
    <p>
      <a href="https://velog.io/@ksh0330/posts" target="_blank" class="btn btn-primary">
        <i class="fa-solid fa-external-link-alt"></i> Velog 블로그 바로가기
      </a>
    </p>
  </div>
</div>
