package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Resources {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ResourceID")
    Long resourceID;
    String name;
    String description;
    float price ;
    @Enumerated(EnumType.STRING)
    ResourceStatus reStatus ;
    @Enumerated(EnumType.STRING)
    ResourcesCategorie categorie ;
    @Lob
    @Column(name = "image", columnDefinition="LONGBLOB")
    private byte[] image;




    @OneToOne(mappedBy = "resource")
    @JsonIgnore
    private Stock stock;
    @ManyToMany
    private List <Project> projects;



}
