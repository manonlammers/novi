package kbs.utils;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.io.IOException;

public class BindingResultFieldErrorAdapter extends TypeAdapter<BindingResult> {

    @Override
    public void write(JsonWriter jsonWriter, BindingResult bindingResult) throws IOException {
        jsonWriter.beginObject();
        for (FieldError error : bindingResult.getFieldErrors()) {
            jsonWriter.name(error.getField());
            jsonWriter.value(error.getDefaultMessage());
        }

        jsonWriter.endObject();
    }

    @Override
    public BindingResult read(JsonReader jsonReader) throws IOException {
        return null;
    }
}
