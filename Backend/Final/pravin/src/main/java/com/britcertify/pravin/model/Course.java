    package com.britcertify.pravin.model;

    import jakarta.persistence.Column;
    import jakarta.persistence.Entity;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;
    import jakarta.persistence.Lob;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;

    @Entity
    @Builder
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public class Course {
        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private String id;
        private String courseName;
        private String duration;
        private String fees;
        private String level;
        @Lob
        @Column(length = 2097152)
        private byte[] image;
    
    }
