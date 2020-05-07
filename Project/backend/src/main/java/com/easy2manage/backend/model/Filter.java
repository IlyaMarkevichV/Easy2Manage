package com.easy2manage.backend.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "filter")
public class Filter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "query")
    private String query;

//    @OneToOne(cascade = CascadeType.REMOVE ,mappedBy = "filter")
//    @OnDelete(action = OnDeleteAction.NO_ACTION)
//    @JsonManagedReference
//    private Dashboard dashboard;
}
