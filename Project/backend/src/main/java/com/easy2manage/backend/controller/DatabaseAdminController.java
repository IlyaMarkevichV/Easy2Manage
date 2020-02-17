package com.easy2manage.backend.controller;

import com.mysql.jdbc.Driver;
import org.apache.ibatis.jdbc.ScriptRunner;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.Reader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@RestController
@RequestMapping(value = "/api/database")
@PropertySource("classpath:application.properties")
public class DatabaseAdminController {


    @Value("${spring.datasource.url}")
    String sqlUrl;

    @Value("${spring.datasource.username}")
    String username;

    @Value("${spring.datasource.password}")
    String password;

    @Value("${database.path}")
    String dbFilePath;

    @PostMapping(value = "/init")
    public ResponseEntity<?> initDatabase() {
        try {
            DriverManager.registerDriver(new Driver());
            Connection con = DriverManager.getConnection(sqlUrl, username, password);
            ScriptRunner sr = new ScriptRunner(con);
            Reader reader = new BufferedReader(new FileReader(dbFilePath));
            sr.runScript(reader);

            return ResponseEntity.ok("Database is successfully initialized.");
        } catch (SQLException | FileNotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
