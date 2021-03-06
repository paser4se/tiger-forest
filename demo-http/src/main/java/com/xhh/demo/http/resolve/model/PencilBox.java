package com.xhh.demo.http.resolve.model;

import lombok.*;

/**
 * PencilBox
 *
 * @author tiger
 * @version 1.0.0 createTime: 14-4-25
 * @since 1.6
 */
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PencilBox extends Box{

    @Getter
    @Setter
    private String pencilBox;
}
