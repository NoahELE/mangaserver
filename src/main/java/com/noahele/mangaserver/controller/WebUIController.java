package com.noahele.mangaserver.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller
public class WebUIController {
    @GetMapping({"/login", "/library/**", "/manga/**"})
    public String index() {
        log.info("Request index");
        return "forward:/index.html";
    }
}
