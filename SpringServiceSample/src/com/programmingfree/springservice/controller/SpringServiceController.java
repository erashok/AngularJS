package com.programmingfree.springservice.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/service/greeting")
public class SpringServiceController {
	private String str="ashsoks";
	@RequestMapping(value = "/{name}", method = RequestMethod.GET)
	public ModelAndView getGreeting(@PathVariable String name,ModelMap model) {
		String result="Hello "+name;
		model.put("CksiIU", "Yui");
		ModelAndView modelAndView=new ModelAndView("main", model);
		
		return modelAndView;
	}
}