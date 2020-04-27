package com.easy2manage.backend.repository;


import com.mysql.jdbc.Driver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;


@Component
@RequestMapping(value = "/api/database")
@PropertySource("classpath:application.properties")
public class QueryManager {
    @Value("${spring.datasource.url}")
    String sqlUrl;

    @Value("${spring.datasource.username}")
    String username;

    @Value("${spring.datasource.password}")
    String password;

    @Value("${database.path}")
    String dbFilePath;


    private Connection connection;

    @PostConstruct
    private void postConstruct(){
        try {
            DriverManager.registerDriver(new Driver());
            connection = DriverManager.getConnection(sqlUrl, username, password);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new IllegalStateException("SQL error");
        }
    }

    @PreDestroy
    private void preDestroy(){
        try {
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new IllegalStateException("SQL error");
        }
    }

    public List<Integer> getTicketIds(String query){
        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query);

            List<Integer> ids = getIdsFromResultSet(resultSet);

            statement.close();
            return ids;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new IllegalStateException("SQL error");
        }
    }

    private List<Integer> getIdsFromResultSet(ResultSet resultSet) throws SQLException {
        List<Integer> ids = new ArrayList<>();
        while (resultSet.next()){
            ids.add(resultSet.getInt("id"));
        }
        return ids;
    }

}
