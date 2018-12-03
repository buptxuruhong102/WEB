package ${servicePackage};

import ${modelPackage}.${modelNameUpperCamel};
import ${mapperPackage}.${modelNameUpperCamel}Mapper;
import ${pageClassPath};

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import org.apache.ibatis.annotations.Param;

/**
 *
 * Created by ${author} on ${date}.
 */
public interface I${modelNameUpperCamel}Service {
<#list interfaceMethodsList as serviceMethod>
${serviceMethod!''}
</#list>
}
