package com.noahele.mangaserver.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebUIController {
    @GetMapping({"/login", "/library/**"})
    public String index() {
        return "forward:/";
    }
}
